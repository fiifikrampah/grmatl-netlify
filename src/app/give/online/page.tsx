"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function GiveOnline() {
  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      {/* Header with Back Button */}
      <div className="p-4 border-b border-gray-100 flex-none bg-white z-10">
        <Link href="/give" className="text-gray-600 hover:text-green-600 font-medium inline-flex items-center gap-2 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Giving Page
        </Link>
      </div>
      
      {/* Full Height Iframe Container */}
      <div className="flex-1 w-full relative bg-gray-50">
        <iframe
          src="https://give.tithe.ly/?formId=1f6a8698-6865-11ee-90fc-1260ab546d11"
          className="absolute inset-0 w-full h-full border-0"
          title="Give via Tithe.ly"
        />
      </div>
    </div>
  )
}
