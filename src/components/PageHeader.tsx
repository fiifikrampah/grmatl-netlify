"use client"

import Image from 'next/image'

interface PageHeaderProps {
  title: string
  subtitle?: string
  imageSrc: string
  overlayColor?: string
}

export default function PageHeader({
  title,
  subtitle,
  imageSrc,
  overlayColor = "bg-black/50"
}: PageHeaderProps) {
  return (
    <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-[center_15%]"
          priority
        />
        <div className={`absolute inset-0 ${overlayColor}`} />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight animate-fade-in-up"
          style={{ animationDelay: '0s' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up-delay">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
