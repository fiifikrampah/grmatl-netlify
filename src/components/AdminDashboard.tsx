"use client"

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Download, FileText, Calendar, ArrowLeft, Trash2, Table as TableIcon, LayoutGrid, HandHeart, UserPlus, MessageSquareHeart, Inbox } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type Source = 'event' | 'connect'

interface EventSummary {
  slug: string
  response_count: number
  latest_response: string
}

interface ConnectFormSummary {
  form_type: string
  submission_count: number
  latest_submission: string
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

const CONNECT_FORM_META: Record<string, { label: string; description: string; Icon: React.ComponentType<{ className?: string }>; color: string }> = {
  visitor: {
    label: 'First Time Visitors',
    description: 'Welcome forms from /connect',
    Icon: UserPlus,
    color: 'text-[#1B5299]',
  },
  prayer: {
    label: 'Prayer Requests',
    description: 'Prayer requests from /connect',
    Icon: HandHeart,
    color: 'text-[#6b4fa3]',
  },
  experience: {
    label: 'Experience Surveys',
    description: 'Hospitality feedback from /connect',
    Icon: MessageSquareHeart,
    color: 'text-[#0f766e]',
  },
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

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<EventSummary[]>([])
  const [connectForms, setConnectForms] = useState<ConnectFormSummary[]>([])
  const [rows, setRows] = useState<DataRow[]>([])
  const [selected, setSelected] = useState<SelectedGroup | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [rowToDelete, setRowToDelete] = useState<DataRow | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

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
      const [eventsRes, connectRes] = await Promise.all([
        fetch('/api/admin/responses'),
        fetch('/api/admin/connect-submissions'),
      ])

      if (eventsRes.ok) {
        const data = await eventsRes.json()
        setEvents(data.events || [])
      }
      if (connectRes.ok) {
        const data = await connectRes.json()
        setConnectForms(data.forms || [])
      }
    } catch (error) {
      console.error('Error fetching summaries:', error)
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <Button
              variant="outline"
              onClick={() => {
                setSelected(null)
                window.scrollTo(0, 0)
              }}
              className="flex items-center gap-2 w-full sm:w-auto self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wide mb-2">
                  {selected.source === 'event' ? 'Event Registration' : 'Connect Submission'}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-grm-primary break-words">
                  {selected.label}
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {rows.length} response{rows.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* View toggle */}
                <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 self-start">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      viewMode === 'table' ? 'bg-grm-primary text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <TableIcon className="h-4 w-4" />
                    Table
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      viewMode === 'cards' ? 'bg-grm-primary text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Cards
                  </button>
                </div>
                <Button
                  onClick={downloadCSV}
                  className="bg-grm-primary hover:bg-grm-secondary flex items-center justify-center gap-2"
                  disabled={rows.length === 0}
                >
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          {rows.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 sm:py-12">
                  <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Responses Yet</h3>
                  <p className="text-sm sm:text-base text-gray-600 px-4">
                    Submissions will appear here as they come in.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : viewMode === 'table' ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                        Submitted
                      </th>
                      {allKeys.map((k) => (
                        <th
                          key={k}
                          className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap min-w-[140px]"
                        >
                          {formatLabel(k)}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right font-semibold text-gray-700 whitespace-nowrap sticky right-0 bg-gray-50 z-10 border-l border-gray-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-100">
                          <div className="font-medium text-gray-900">
                            {new Date(row.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(row.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </td>
                        {allKeys.map((k) => {
                          const val = cellValue(row.data[k])
                          return (
                            <td
                              key={k}
                              className="px-4 py-3 text-gray-700 align-top max-w-[300px]"
                            >
                              <div className="break-words whitespace-pre-wrap">
                                {val || <span className="text-gray-300">—</span>}
                              </div>
                            </td>
                          )
                        })}
                        <td className="px-4 py-3 text-right sticky right-0 bg-white hover:bg-gray-50 z-10 border-l border-gray-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(row)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            // Cards view
            <div className="space-y-3 sm:space-y-4">
              {rows.map((row) => (
                <Card key={row.id}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl">Submission</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">
                          {new Date(row.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(row)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {Object.entries(row.data).map(([key, value]) => (
                        <div key={key} className="break-words">
                          <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2">
                            {formatLabel(key)}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base break-words whitespace-pre-wrap">
                            {cellValue(value) || '—'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

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

  // ===== LIST VIEW: All forms + events =====
  // Always render the known connect form types — even with 0 submissions —
  // so the dashboard structure is consistent regardless of data.
  const connectFormsByType = new Map(connectForms.map((f) => [f.form_type, f]))
  const allConnectForms: ConnectFormSummary[] = Object.keys(CONNECT_FORM_META).map(
    (type) =>
      connectFormsByType.get(type) ?? {
        form_type: type,
        submission_count: 0,
        latest_submission: '',
      }
  )
  const hasEvents = events.length > 0

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-grm-primary">Admin Dashboard</h1>
          {user && (
            <p className="text-gray-600 mt-1 text-sm sm:text-base break-words">
              Logged in as {user.email}
            </p>
          )}
        </div>

        {/* Connect Submissions Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Inbox className="h-5 w-5 text-grm-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-grm-primary">Connect Submissions</h2>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            Submissions from the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">/connect</code> page — visitor welcomes, prayer requests, and experience surveys.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {allConnectForms.map((form) => {
              const meta = CONNECT_FORM_META[form.form_type] || {
                label: formatLabel(form.form_type),
                description: '',
                Icon: FileText,
                color: 'text-gray-600',
              }
              const Icon = meta.Icon
              const count = form.submission_count
              const isEmpty = count === 0
              return (
                <Card
                  key={form.form_type}
                  className={`transition-all border ${
                    isEmpty
                      ? 'opacity-75 cursor-default'
                      : 'cursor-pointer hover:shadow-lg hover:border-grm-primary/40 hover:-translate-y-0.5'
                  }`}
                  onClick={() => {
                    if (isEmpty) return
                    setSelected({
                      source: 'connect',
                      key: form.form_type,
                      label: meta.label,
                    })
                    window.scrollTo(0, 0)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2.5 rounded-xl bg-gray-50 ${meta.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl text-grm-primary break-words flex-1">
                          {meta.label}
                        </CardTitle>
                      </div>
                      <span
                        className={`text-xl sm:text-2xl font-bold flex-shrink-0 ${
                          isEmpty ? 'text-gray-300' : 'text-grm-primary'
                        }`}
                      >
                        {count}
                      </span>
                    </div>
                    <CardDescription className="text-xs sm:text-sm">
                      {meta.description}
                      {!isEmpty && form.latest_submission && (
                        <>
                          {' · '}Latest: {new Date(form.latest_submission).toLocaleDateString()}
                        </>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {isEmpty
                        ? 'No submissions yet'
                        : `Click to view ${count} submission${count !== 1 ? 's' : ''}`}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Event Registrations Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-grm-primary" />
            <h2 className="text-xl sm:text-2xl font-bold text-grm-primary">Event Registrations</h2>
          </div>

          {hasEvents ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map((event) => (
                <Card
                  key={event.slug}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => {
                    setSelected({
                      source: 'event',
                      key: event.slug,
                      label: event.slug,
                    })
                    window.scrollTo(0, 0)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-lg sm:text-xl text-grm-primary break-words flex-1">
                        {event.slug}
                      </CardTitle>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-grm-primary" />
                        <span className="text-xl sm:text-2xl font-bold text-grm-primary">
                          {event.response_count}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="text-xs sm:text-sm">
                      Latest: {new Date(event.latest_response).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Click to view all {event.response_count} response{event.response_count !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 sm:py-10">
                  <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">No event registrations yet</h3>
                  <p className="text-sm text-gray-600 px-4">
                    Event signups will appear here once they come in.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
