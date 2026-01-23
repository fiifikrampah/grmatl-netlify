"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Download, FileText, Calendar, ArrowLeft, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Event {
  slug: string
  response_count: number
  latest_response: string
}

interface EventResponse {
  id: string
  event_slug: string
  response_data: Record<string, unknown>
  created_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [responses, setResponses] = useState<EventResponse[]>([])
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [responseToDelete, setResponseToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/responses')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchResponses = useCallback(async (eventSlug: string) => {
    try {
      const response = await fetch(`/api/admin/responses?event_slug=${eventSlug}`)
      if (response.ok) {
        const data = await response.json()
        setResponses(data.responses || [])
      }
    } catch (error) {
      console.error('Error fetching responses:', error)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchEvents()
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [checkAuth, fetchEvents])

  useEffect(() => {
    if (selectedEvent) {
      fetchResponses(selectedEvent)
      // Scroll to top when selecting an event
      window.scrollTo(0, 0)
    }
  }, [selectedEvent, fetchResponses])


  const handleDeleteClick = (responseId: string) => {
    setResponseToDelete(responseId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!responseToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/responses/${responseToDelete}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        // Remove from local state
        setResponses(prev => prev.filter(r => r.id !== responseToDelete))
        // Refresh events to update counts
        fetchEvents()
      } else {
        console.error('Delete error:', data)
        alert(data.error || 'Failed to delete response. Check console for details.')
      }
    } catch (error) {
      console.error('Error deleting response:', error)
      alert('An error occurred while deleting the response')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setResponseToDelete(null)
    }
  }

  const downloadCSV = (eventSlug: string) => {
    const eventResponses = responses.filter(r => r.event_slug === eventSlug)

    if (eventResponses.length === 0) {
      alert('No responses to download')
      return
    }

    // Get all unique keys from all responses
    const allKeys = new Set<string>()
    eventResponses.forEach(response => {
      Object.keys(response.response_data).forEach(key => allKeys.add(key))
    })

    const headers = ['Submitted At', ...Array.from(allKeys)]
    const rows = eventResponses.map(response => {
      const row = [
        new Date(response.created_at).toLocaleString(),
        ...Array.from(allKeys).map(key => {
          const value = response.response_data[key]
          // Handle arrays and objects
          if (Array.isArray(value)) {
            return value.join('; ')
          }
          if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value)
          }
          return value?.toString() || ''
        })
      ]
      return row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    })

    const csv = [headers.map(h => `"${h}"`).join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${eventSlug}-responses-${new Date().toISOString().split('T')[0]}.csv`
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

  // Show event responses view
  if (selectedEvent) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
            <div className="flex-1">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedEvent(null)
                  window.scrollTo(0, 0)
                }}
                className="mb-4 flex items-center gap-2 w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Button>
              <h1 className="text-2xl sm:text-3xl font-bold text-grm-primary break-words">{selectedEvent}</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {responses.length} response{responses.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
              <Button
                onClick={() => downloadCSV(selectedEvent)}
                className="bg-grm-primary hover:bg-grm-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
                disabled={responses.length === 0}
              >
                <Download className="h-4 w-4" />
                Download CSV
              </Button>
            </div>
          </div>

          {/* Responses List */}
          <div className="space-y-3 sm:space-y-4">
            {responses.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 sm:py-12">
                    <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Responses Yet</h3>
                    <p className="text-sm sm:text-base text-gray-600 px-4">No one has registered for this event yet.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              responses.map(response => (
                <Card key={response.id}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg sm:text-xl">Registration</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">
                          {new Date(response.created_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(response.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {Object.entries(response.response_data).map(([key, value]) => (
                        <div key={key} className="break-words">
                          <p className="font-semibold text-gray-700 text-sm sm:text-base mb-2">
                            {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </p>
                          <p className="text-gray-600 text-sm sm:text-base break-words">
                            {Array.isArray(value) 
                              ? value.join(', ')
                              : typeof value === 'object' && value !== null
                              ? JSON.stringify(value)
                              : String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Response?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this registration response? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false)
                  setResponseToDelete(null)
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

  // Show events list view
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-grm-primary">Event Responses</h1>
          {user && <p className="text-gray-600 mt-1 text-sm sm:text-base break-words">Logged in as {user.email}</p>}
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 sm:py-12">
                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Events Yet</h3>
                <p className="text-sm sm:text-base text-gray-600 px-4">Once you start receiving form submissions, events will appear here.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map(event => (
              <Card 
                key={event.slug} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setSelectedEvent(event.slug)
                  window.scrollTo(0, 0)
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg sm:text-xl text-grm-primary break-words flex-1">{event.slug}</CardTitle>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-grm-primary" />
                      <span className="text-xl sm:text-2xl font-bold text-grm-primary">{event.response_count}</span>
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
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Response?</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this registration response? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteDialogOpen(false)
                  setResponseToDelete(null)
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
    </div>
  )
}
