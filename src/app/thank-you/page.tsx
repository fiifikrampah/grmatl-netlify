"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowLeft } from 'lucide-react'
import Reveal from '@/components/Reveal'

export default function ThankYou() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
                <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_100%)]">
                    <Image
                        src="/images/give/hero.webp"
                        alt="Thank You"
                        fill
                        sizes="100vw"
                        className="object-cover object-[center_35%]"
                        priority
                        fetchPriority="high"
                        quality={92}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(27,82,153,0.3)_0%,_rgba(15,58,112,0.6)_60%,_rgba(15,58,112,0.9)_100%)] z-10" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center drop-shadow-lg">
                        <Reveal>
                            <Heart className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 text-red-400" />
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 leading-tight">
                                <span className="text-white">Thank You</span>
                            </h1>
                            <p className="text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed">
                                Thank you for your generous donation.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">Your Contribution Matters</h2>
                    <p className="text-lg text-gray-600/90 max-w-2xl mx-auto leading-relaxed">
                        Your generosity truly makes a difference in our church and beyond. We are sincerely grateful for your support. May God bless you! Through your giving, we are able to continue sharing God’s love, serving our community, and growing together in faith.
                    </p>
                    <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mt-4">
                        If you experienced any trouble making an online payment, please email our technical support team: <a href="mailto:grmmedia16@gmail.com" className="text-[var(--grm-primary-blue)] hover:underline">grmmedia16@gmail.com</a>
                    </p>
                    <div className="mt-6">
                        <Link href="/" className="text-[var(--grm-primary-blue)] transition-all inline-flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}