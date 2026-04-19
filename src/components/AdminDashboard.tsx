"use client"

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Download, FileText, Calendar, ArrowLeft, Trash2, HandHeart, UserPlus, MessageSquareHeart, Inbox, Search, Activity, TrendingUp, Clock, ExternalLink, ChevronUp, ChevronDown, Copy, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sparkline } from '@/components/admin/Sparkline'

type Source = 'event' | 'connect'

interface EventSummary {
  slug: string
  response_count: number
  latest_response: string
  week_counts?: number[]
}

interface ConnectFormSummary {
  form_type: string
  submission_count: number
  latest_submission: string
  week_counts?: number[]
}

interface ActivityItem {
  id: string
  source: Source
  group_key: string
  name: string | null
  created_at: string
}

interface DashboardStats {
  allTime: number
  weekCount: number
  mostRecent: string | null
}

interface DataRow {
  id: string
  source: Source
  // For events: event_slug. For connect: form_type
  group_key: string
  data: Record<string, unknown>
  created_at: string
}

interface SelectedGroup {
  source: Source
  key: string
  label: string
}

const CONNECT_FORM_META: Record<string, { label: string; description: string; Icon: React.ComponentType<{ className?: string }>; color: string; accent: string }> = {
  visitor: {
    label: 'First Time Visitors',
    description: 'Welcome forms',
    Icon: UserPlus,
    color: 'text-[#1B5299]',
    accent: '#1B5299',
  },
  prayer: {
    label: 'Prayer Requests',
    description: 'Prayer requests',
    Icon: HandHeart,
    color: 'text-[#6b4fa3]',
    accent: '#6b4fa3',
  },
  experience: {
    label: 'Experience Surveys',
    description: 'Hospitality feedback',
    Icon: MessageSquareHeart,
    color: 'text-[#0f766e]',
    accent: '#0f766e',
  },
}

function titleCaseSlug(slug: string): string {
  return slug
    .replace(/-\d{4}$/, (y) => ` ${y.slice(1)}`) // trailing -2026 → " 2026"
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (s) => s.toUpperCase())
    .trim()
}

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

function formatLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (s) => s.toUpperCase())
}

function cellValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

// Columns are reordered so the most human-useful fields (name, contact, location)
// appear first regardless of submission_data ordering.
function keyPriority(key: string): number {
  const k = key.toLowerCase().replace(/[_\s-]/g, '')
  if (/^(fullname|name|yourname)$/.test(k)) return 0
  if (/^firstname$/.test(k)) return 1
  if (/^lastname$/.test(k)) return 2
  if (/email/.test(k)) return 3
  if (/(phone|mobile|cell)/.test(k)) return 4
  if (/(address|city|state|zip|country)/.test(k)) return 5
  return 99
}

function reorderKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    const pa = keyPriority(a)
    const pb = keyPriority(b)
    if (pa !== pb) return pa - pb
    return keys.indexOf(a) - keys.indexOf(b)
  })
}

function formatPhone(value: string): string {
  const digits = String(value).replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return String(value)
}

function isPhoneKey(k: string): boolean {
  return /(phone|mobile|cell)/i.test(k)
}

function isEmailKey(k: string): boolean {
  return /email/i.test(k)
}

function findName(data: Record<string, unknown>): string | null {
  const candidates = ['full_name', 'name', 'Name', 'Full Name', 'your_name', 'first_name']
  for (const k of candidates) {
    const v = data?.[k]
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return null
}

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<EventSummary[]>([])
  const [connectForms, setConnectForms] = useState<ConnectFormSummary[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [stats, setStats] = useState<DashboardStats>({ allTime: 0, weekCount: 0, mostRecent: null })
  const [rows, setRows] = useState<DataRow[]>([])
  const [selected, setSelected] = useState<SelectedGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [rowToDelete, setRowToDelete] = useState<DataRow | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  // Detail-view state
  const [detailSearch, setDetailSearch] = useState('')
  const [sortKey, setSortKey] = useState<string>('created_at')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [rowDetail, setRowDetail] = useState<DataRow | null>(null)
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()
      if (data.user) {
        setUser(data.user)
      } else {
        router.push('/admin/login')
      }
    } catch {
      router.push('/admin/login')
    }
  }, [router])

  const fetchSummaries = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/dashboard')
      if (res.ok) {
        const data = await res.json()
        setEvents(data.events || [])
        setConnectForms(data.connectForms || [])
        setActivity(data.activity || [])
        setStats(data.stats || { allTime: 0, weekCount: 0, mostRecent: null })
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRows = useCallback(async (group: SelectedGroup) => {
    try {
      if (group.source === 'event') {
        const res = await fetch(`/api/admin/responses?event_slug=${encodeURIComponent(group.key)}`)
        if (res.ok) {
          const data = await res.json()
          const mapped: DataRow[] = (data.responses || []).map((r: { id: string; event_slug: string; response_data: Record<string, unknown>; created_at: string }) => ({
            id: r.id,
            source: 'event' as const,
            group_key: r.event_slug,
            data: r.response_data,
            created_at: r.created_at,
          }))
          setRows(mapped)
        }
      } else {
        const res = await fetch(`/api/admin/connect-submissions?form_type=${encodeURIComponent(group.key)}`)
        if (res.ok) {
          const data = await res.json()
          const mapped: DataRow[] = (data.submissions || []).map((s: { id: string; form_type: string; submission_data: Record<string, unknown>; created_at: string }) => ({
            id: s.id,
            source: 'connect' as const,
            group_key: s.form_type,
            data: s.submission_data,
            created_at: s.created_at,
          }))
          setRows(mapped)
        }
      }
    } catch (error) {
      console.error('Error fetching rows:', error)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchSummaries()
    window.scrollTo(0, 0)
  }, [checkAuth, fetchSummaries])

  useEffect(() => {
    if (selected) {
      fetchRows(selected)
      window.scrollTo(0, 0)
    } else {
      setRows([])
    }
  }, [selected, fetchRows])

  const handleDeleteClick = (row: DataRow) => {
    setRowToDelete(row)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!rowToDelete) return

    setIsDeleting(true)
    try {
      const endpoint =
        rowToDelete.source === 'event'
          ? `/api/admin/responses/${rowToDelete.id}`
          : `/api/admin/connect-submissions/${rowToDelete.id}`

      const response = await fetch(endpoint, { method: 'DELETE' })
      const data = await response.json()

      if (response.ok) {
        setRows((prev) => prev.filter((r) => r.id !== rowToDelete.id))
        fetchSummaries()
      } else {
        console.error('Delete error:', data)
        alert(data.error || 'Failed to delete. Check console for details.')
      }
    } catch (error) {
      console.error('Error deleting row:', error)
      alert('An error occurred while deleting.')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setRowToDelete(null)
    }
  }

  // All unique keys across rows for this selection
  const allKeys = useMemo(() => {
    const keys = new Set<string>()
    rows.forEach((row) => {
      Object.keys(row.data).forEach((k) => keys.add(k))
    })
    return Array.from(keys)
  }, [rows])

  const downloadCSV = () => {
    if (rows.length === 0) {
      alert('No responses to download')
      return
    }

    const headers = ['Submitted At', ...allKeys.map(formatLabel)]
    const csvRows = rows.map((row) => {
      const vals = [
        new Date(row.created_at).toLocaleString(),
        ...allKeys.map((k) => cellValue(row.data[k])),
      ]
      return vals.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')
    })

    const csv = [headers.map((h) => `"${h}"`).join(','), ...csvRows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const filenameSlug = selected?.key.replace(/[^a-z0-9]+/gi, '-') || 'responses'
    a.download = `${filenameSlug}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-grm-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // ===== DETAIL VIEW: Responses for a selected group =====
  if (selected) {
    return (
      <div className="min-h-screen">
        {(() => {
          const isEvent = selected.source === 'event'
          const noun = isEvent ? 'registration' : 'submission'
          const todayStart = new Date()
          todayStart.setHours(0, 0, 0, 0)
          const todayCount = rows.filter((r) => new Date(r.created_at) >= todayStart).length
          const latestRow = rows[0]
          const orderedKeys = reorderKeys(allKeys)

          const q = detailSearch.trim().toLowerCase()
          const searched = !q
            ? rows
            : rows.filter((row) =>
                Object.values(row.data).some((v) =>
                  cellValue(v).toLowerCase().includes(q)
                )
              )

          const sortedRows = [...searched].sort((a, b) => {
            let va = ''
            let vb = ''
            if (sortKey === 'created_at') {
              va = a.created_at
              vb = b.created_at
            } else {
              va = cellValue(a.data[sortKey]).toLowerCase()
              vb = cellValue(b.data[sortKey]).toLowerCase()
            }
            const cmp = va < vb ? -1 : va > vb ? 1 : 0
            return sortDir === 'asc' ? cmp : -cmp
          })

          const toggleSort = (key: string) => {
            if (sortKey === key) {
              setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
            } else {
              setSortKey(key)
              setSortDir(key === 'created_at' ? 'desc' : 'asc')
            }
          }

          const copyRow = async (row: DataRow) => {
            const text = orderedKeys
              .map((k) => `${formatLabel(k)}: ${cellValue(row.data[k]) || '—'}`)
              .join('\n')
            try {
              await navigator.clipboard.writeText(text)
              setCopiedRowId(row.id)
              setTimeout(() => setCopiedRowId(null), 1500)
            } catch {
              /* ignore */
            }
          }

          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* ===== Compact header row ===== */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelected(null)
                    window.scrollTo(0, 0)
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-semibold uppercase tracking-wide">
                  {isEvent ? 'Event' : 'Connect'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-grm-primary flex-1 min-w-0 truncate">
                  {selected.label}
                </h1>
                <Button
                  onClick={downloadCSV}
                  size="sm"
                  className="bg-grm-primary hover:bg-grm-secondary"
                  disabled={rows.length === 0}
                >
                  <Download className="h-4 w-4 mr-1.5" />
                  Download Submissions
                </Button>
              </div>

              {/* ===== Summary + search ===== */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>
                    <strong className="text-grm-primary">{rows.length}</strong>{' '}
                    {noun}
                    {rows.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span>
                    <strong className="text-grm-primary">{todayCount}</strong> today
                  </span>
                  {latestRow && (
                    <>
                      <span className="text-gray-300">·</span>
                      <span>
                        latest{' '}
                        <span
                          title={new Date(latestRow.created_at).toLocaleString()}
                        >
                          {relativeTime(latestRow.created_at)}
                        </span>
                      </span>
                    </>
                  )}
                </div>
                {rows.length > 0 && (
                  <div className="relative sm:max-w-xs w-full">
                    <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={detailSearch}
                      onChange={(e) => setDetailSearch(e.target.value)}
                      placeholder={`Search ${noun}s…`}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-grm-primary/20 focus:border-grm-primary/40 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* ===== Content ===== */}
              {rows.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No {noun}s yet
                      </h3>
                      <p className="text-sm text-gray-600">
                        Submissions will appear here as they come in.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : sortedRows.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-10">
                      <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">
                        No {noun}s match your search.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Mobile: compact card list */}
                  <div className="sm:hidden space-y-2">
                    {sortedRows.map((row) => {
                      const name = findName(row.data)
                      const summaryKey = orderedKeys.find(
                        (k) =>
                          !/^(full_?name|name|first_?name|last_?name|your_?name)$/i.test(
                            k
                          ) && cellValue(row.data[k])
                      )
                      return (
                        <button
                          key={row.id}
                          onClick={() => setRowDetail(row)}
                          className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-grm-primary truncate">
                                {name || (
                                  <span className="italic text-gray-400">
                                    Anonymous
                                  </span>
                                )}
                              </div>
                              {summaryKey && (
                                <div className="text-sm text-gray-600 truncate mt-0.5">
                                  {cellValue(row.data[summaryKey])}
                                </div>
                              )}
                            </div>
                            <span
                              className="text-[11px] text-gray-400 flex-shrink-0 tabular-nums"
                              title={new Date(row.created_at).toLocaleString()}
                            >
                              {relativeTime(row.created_at)}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Desktop: table */}
                  <div className="hidden sm:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            {orderedKeys.map((k) => (
                              <th
                                key={k}
                                className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap min-w-[140px]"
                              >
                                <button
                                  onClick={() => toggleSort(k)}
                                  className="inline-flex items-center gap-1 hover:text-grm-primary transition-colors"
                                >
                                  {formatLabel(k)}
                                  {sortKey === k &&
                                    (sortDir === 'asc' ? (
                                      <ChevronUp className="h-3 w-3" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3" />
                                    ))}
                                </button>
                              </th>
                            ))}
                            <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                              <button
                                onClick={() => toggleSort('created_at')}
                                className="inline-flex items-center gap-1 hover:text-grm-primary transition-colors"
                              >
                                Submitted
                                {sortKey === 'created_at' &&
                                  (sortDir === 'asc' ? (
                                    <ChevronUp className="h-3 w-3" />
                                  ) : (
                                    <ChevronDown className="h-3 w-3" />
                                  ))}
                              </button>
                            </th>
                            <th className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap sticky right-0 bg-gray-50 z-10 border-l border-gray-200">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {sortedRows.map((row) => (
                            <tr
                              key={row.id}
                              onClick={() => setRowDetail(row)}
                              className="hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              {orderedKeys.map((k) => {
                                const val = cellValue(row.data[k])
                                return (
                                  <td
                                    key={k}
                                    className="px-4 py-3 text-gray-700 align-top max-w-[240px]"
                                  >
                                    <div
                                      className="truncate"
                                      title={val || undefined}
                                    >
                                      {val ? (
                                        isPhoneKey(k) ? (
                                          <a
                                            href={`tel:${val.replace(/\D/g, '')}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-[#1B5299] hover:underline tabular-nums"
                                          >
                                            {formatPhone(val)}
                                          </a>
                                        ) : isEmailKey(k) ? (
                                          <a
                                            href={`mailto:${val}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-[#1B5299] hover:underline"
                                          >
                                            {val}
                                          </a>
                                        ) : (
                                          val
                                        )
                                      ) : (
                                        <span className="text-gray-300">—</span>
                                      )}
                                    </div>
                                  </td>
                                )
                              })}
                              <td
                                className="px-4 py-3 text-gray-600 whitespace-nowrap"
                                title={new Date(row.created_at).toLocaleString()}
                              >
                                {relativeTime(row.created_at)}
                              </td>
                              <td className="px-4 py-3 text-right whitespace-nowrap sticky right-0 bg-white z-10 border-l border-gray-100">
                                <div className="inline-flex items-center gap-0.5">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      copyRow(row)
                                    }}
                                    className="text-gray-500 hover:text-grm-primary"
                                    title="Copy row"
                                  >
                                    {copiedRowId === row.id ? (
                                      <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteClick(row)
                                    }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* Row detail modal */}
              <Dialog
                open={!!rowDetail}
                onOpenChange={(open) => !open && setRowDetail(null)}
              >
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                  {rowDetail && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="break-words">
                          {findName(rowDetail.data) || 'Submission'}
                        </DialogTitle>
                        <DialogDescription>
                          {new Date(rowDetail.created_at).toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                        {orderedKeys.map((k) => {
                          const val = cellValue(rowDetail.data[k])
                          return (
                            <div key={k} className="break-words">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                                {formatLabel(k)}
                              </p>
                              <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                                {val ? (
                                  isPhoneKey(k) ? (
                                    <a
                                      href={`tel:${val.replace(/\D/g, '')}`}
                                      className="text-[#1B5299] hover:underline tabular-nums"
                                    >
                                      {formatPhone(val)}
                                    </a>
                                  ) : isEmailKey(k) ? (
                                    <a
                                      href={`mailto:${val}`}
                                      className="text-[#1B5299] hover:underline break-all"
                                    >
                                      {val}
                                    </a>
                                  ) : (
                                    val
                                  )
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={() => copyRow(rowDetail)}
                        >
                          {copiedRowId === rowDetail.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1.5 text-green-600" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1.5" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleDeleteClick(rowDetail)
                            setRowDetail(null)
                          }}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1.5" />
                          Delete
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )
        })()}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Response?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this submission? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false)
                  setRowToDelete(null)
                }}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // ===== LIST VIEW =====
  // Always render the three known connect form types so the card structure
  // stays stable regardless of data; separate them into active and inactive.
  const connectFormsByType = new Map(connectForms.map((f) => [f.form_type, f]))
  const allConnectForms: ConnectFormSummary[] = Object.keys(CONNECT_FORM_META).map(
    (type) =>
      connectFormsByType.get(type) ?? {
        form_type: type,
        submission_count: 0,
        latest_submission: '',
        week_counts: [0, 0, 0, 0, 0, 0, 0],
      }
  )
  const activeConnectForms = allConnectForms.filter((f) => f.submission_count > 0)
  const inactiveConnectForms = allConnectForms.filter((f) => f.submission_count === 0)

  const firstName = user?.email?.split('@')[0]?.split('.')[0] || ''
  const greetingName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  // Filter recent activity by search query (name, group label, or form type)
  const q = searchQuery.trim().toLowerCase()
  const filteredActivity = !q
    ? activity
    : activity.filter((a) => {
        const label =
          a.source === 'connect'
            ? CONNECT_FORM_META[a.group_key]?.label || a.group_key
            : titleCaseSlug(a.group_key)
        return (
          (a.name && a.name.toLowerCase().includes(q)) ||
          label.toLowerCase().includes(q) ||
          a.group_key.toLowerCase().includes(q)
        )
      })

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* ===== HERO HEADER ===== */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-grm-primary tracking-tight">
                {greetingName ? `Welcome back, ${greetingName}` : 'Admin Dashboard'}
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Here&apos;s what&apos;s happening across GRM.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#1B5299]/25 text-sm font-semibold text-[#1B5299] hover:bg-[#1B5299] hover:text-white hover:border-[#1B5299] shadow-sm transition-colors whitespace-nowrap"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Site
            </Link>
          </div>
        </div>

        {/* ===== STAT STRIP ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-9">
          <div className="bg-white rounded-xl border border-gray-200/70 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">This week</span>
              <TrendingUp className="h-4 w-4 text-[#0f766e]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-grm-primary leading-none">{stats.weekCount}</p>
            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/70 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">All time</span>
              <Inbox className="h-4 w-4 text-[#1B5299]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-grm-primary leading-none">{stats.allTime}</p>
            <p className="text-xs text-gray-500 mt-1">Total responses</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/70 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Most recent</span>
              <Clock className="h-4 w-4 text-[#b45309]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-grm-primary leading-none">
              {stats.mostRecent ? relativeTime(stats.mostRecent) : '—'}
            </p>
            <p className="text-xs text-gray-500 mt-1">Last submission</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/70 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Active forms</span>
              <Activity className="h-4 w-4 text-[#6b4fa3]" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-grm-primary leading-none">
              {activeConnectForms.length + events.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Receiving data</p>
          </div>
        </div>

        {/* ===== MAIN LAYOUT: recent activity (left) + categories (right) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Recent activity feed */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-grm-primary" />
              <h2 className="text-lg sm:text-xl font-bold text-grm-primary">Recent Activity</h2>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="h-3.5 w-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, form, or event…"
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-grm-primary/20 focus:border-grm-primary/40 focus:outline-none transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="bg-white rounded-xl border border-gray-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
              {filteredActivity.length === 0 ? (
                <div className="py-10 text-center">
                  <Inbox className="h-7 w-7 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    {q ? 'No results match your search.' : 'No activity yet.'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
                  {filteredActivity.map((item) => {
                    const isConnect = item.source === 'connect'
                    const label = isConnect
                      ? CONNECT_FORM_META[item.group_key]?.label || formatLabel(item.group_key)
                      : titleCaseSlug(item.group_key)
                    const meta = isConnect ? CONNECT_FORM_META[item.group_key] : undefined
                    const Icon = meta?.Icon || Calendar
                    const iconColor = meta?.color || 'text-gray-600'
                    return (
                      <li key={`${item.source}-${item.id}`}>
                        <button
                          className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors group"
                          onClick={() => {
                            setSelected({
                              source: item.source,
                              key: item.group_key,
                              label,
                            })
                            window.scrollTo(0, 0)
                          }}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 ${iconColor} flex items-center justify-center`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate leading-tight">
                              {item.name || <span className="text-gray-400 italic">Anonymous</span>}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">
                              {label}
                            </p>
                          </div>
                          <span className="flex-shrink-0 text-[11px] text-gray-400 tabular-nums">
                            {relativeTime(item.created_at)}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Categories (right) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            {/* Connect Submissions */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Inbox className="h-4 w-4 text-grm-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-grm-primary">Connect Submissions</h2>
                {inactiveConnectForms.length > 0 && (
                  <span className="text-[11px] text-gray-400 ml-auto">
                    {inactiveConnectForms.length} inactive
                  </span>
                )}
              </div>

              {activeConnectForms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {activeConnectForms.map((form) => {
                    const meta = CONNECT_FORM_META[form.form_type] || {
                      label: formatLabel(form.form_type),
                      description: '',
                      Icon: FileText,
                      color: 'text-gray-600',
                      accent: '#1B5299',
                    }
                    const Icon = meta.Icon
                    const count = form.submission_count
                    const hasWeekActivity = (form.week_counts || []).some((v) => v > 0)
                    return (
                      <button
                        key={form.form_type}
                        className="text-left bg-white rounded-xl border border-gray-200/70 px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer transition-all hover:shadow-md hover:border-grm-primary/40 hover:-translate-y-0.5"
                        onClick={() => {
                          setSelected({
                            source: 'connect',
                            key: form.form_type,
                            label: meta.label,
                          })
                          window.scrollTo(0, 0)
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`p-1.5 rounded-lg bg-gray-50 ${meta.color} flex-shrink-0`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm font-semibold text-grm-primary truncate">
                              {meta.label}
                            </span>
                          </div>
                          <span className="text-lg font-bold text-grm-primary tabular-nums flex-shrink-0 leading-none">
                            {count}
                          </span>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-[11px] text-gray-500">
                            {form.latest_submission && `Latest ${relativeTime(form.latest_submission)}`}
                          </p>
                          {hasWeekActivity && (
                            <Sparkline
                              values={form.week_counts || []}
                              color={meta.accent}
                            />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No connect submissions yet.</p>
              )}
            </section>

            {/* Event Registrations */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-grm-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-grm-primary">Event Registrations</h2>
              </div>

              {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {events.map((event) => {
                    const hasWeekActivity = (event.week_counts || []).some((v) => v > 0)
                    return (
                      <button
                        key={event.slug}
                        className="text-left bg-white rounded-xl border border-gray-200/70 px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] cursor-pointer transition-all hover:shadow-md hover:border-grm-primary/40 hover:-translate-y-0.5"
                        onClick={() => {
                          setSelected({
                            source: 'event',
                            key: event.slug,
                            label: titleCaseSlug(event.slug),
                          })
                          window.scrollTo(0, 0)
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-sm font-semibold text-grm-primary truncate flex-1 min-w-0">
                            {titleCaseSlug(event.slug)}
                          </span>
                          <span className="text-lg font-bold text-grm-primary tabular-nums flex-shrink-0 leading-none">
                            {event.response_count}
                          </span>
                        </div>
                        <div className="flex items-end justify-between">
                          <p className="text-[11px] text-gray-500">
                            Latest {relativeTime(event.latest_response)}
                          </p>
                          {hasWeekActivity && (
                            <Sparkline
                              values={event.week_counts || []}
                              color="#1B5299"
                            />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No event registrations yet.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
