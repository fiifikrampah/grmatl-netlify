import { NextResponse } from 'next/server'

const DEFAULT_CHANNEL_ID = 'UCaWvM15oR08RL5DYKxQ4TzA'
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

type YouTubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string
    }
  }>
}

async function fetchLiveVideoId(channelId: string, apiKey: string): Promise<string | null> {
  const url = new URL(YOUTUBE_SEARCH_URL)
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('channelId', channelId)
  url.searchParams.set('type', 'video')
  url.searchParams.set('eventType', 'live')
  url.searchParams.set('order', 'date')
  url.searchParams.set('maxResults', '1')
  url.searchParams.set('key', apiKey)

  const response = await fetch(url.toString(), {
    cache: 'no-store',
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`YouTube API error (${response.status}): ${message}`)
  }

  const data = (await response.json()) as YouTubeSearchResponse
  return data.items?.[0]?.id?.videoId ?? null
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: 'YOUTUBE_API_KEY is not configured.' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const channelId = process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID

  try {
    const videoId = await fetchLiveVideoId(channelId, apiKey)

    if (!videoId) {
      return NextResponse.json(
        {
          live: false,
          videoId: null,
          channelId,
        },
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    return NextResponse.json(
      {
        live: true,
        videoId,
        channelId,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Error in GET /api/live-video:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch the current live video.',
      },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
