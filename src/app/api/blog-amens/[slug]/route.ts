import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Requires Supabase table: blog_amens (slug text PRIMARY KEY, count integer NOT NULL DEFAULT 0)
// Run scripts/supabase-blog-amens.sql in the Supabase SQL Editor.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function getSupabase() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** GET /api/blog-amens/[slug] – return amen count for a blog post */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('blog_amens')
    .select('count')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('blog-amens GET error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const count = data?.count ?? 0
  return NextResponse.json({ count })
}

/** POST /api/blog-amens/[slug] – increment amen count for a blog post */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { data: existing } = await supabase
    .from('blog_amens')
    .select('count')
    .eq('slug', slug)
    .maybeSingle()

  const newCount = (existing?.count ?? 0) + 1

  if (existing) {
    const { error } = await supabase
      .from('blog_amens')
      .update({ count: newCount })
      .eq('slug', slug)
    if (error) {
      console.error('blog-amens POST update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  } else {
    const { error } = await supabase.from('blog_amens').insert({ slug, count: newCount })
    if (error) {
      console.error('blog-amens POST insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }

  return NextResponse.json({ count: newCount })
}
