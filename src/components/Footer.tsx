"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
// import { FaXTwitter } from "react-icons/fa6"
import { FaTiktok, FaYoutube } from "react-icons/fa"
import { Button } from '@/components/ui/button'

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/greatredemptionministies/',
    icon: Facebook,
  },
  // {
  //   name: 'X',
  //   href: 'https://x.com/grmatl',
  //   icon: FaXTwitter,
  // },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/grm_atl/',
    icon: Instagram,
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@grm_atl_',
    icon: FaTiktok,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@greatredemptionministries',
    icon: FaYoutube,
  },
]

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blogs' },
  { name: 'Watch Live', href: '/live' },
  { name: 'Give', href: '/give' },
  { name: 'Contact', href: '/contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-4 md:space-y-6 text-center sm:text-left">
            <Link href="/" className="inline-block sm:block">
              <Image
                src="/images/branding/logo.png"
                alt="Great Redemption Ministries"
                width={80}
                height={80}
                className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity w-16 h-auto sm:w-20 mx-auto sm:mx-0"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Therefore if the Son makes you free, you shall be free indeed. We believe in that freedom and live it out in love, service, and worship.
            </p>
            <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-grm-primary hover:text-white transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - icons hidden on mobile */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Visit Us</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm justify-center sm:justify-start">
                <MapPin className="h-5 w-5 mt-0.5 text-grm-primary shrink-0 hidden sm:block" />
                <span>
                  24 Geneva St,<br />
                  Hapeville, GA 30354
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm justify-center sm:justify-start">
                <Phone className="h-5 w-5 text-grm-primary shrink-0 hidden sm:block" />
                <a href="tel:+14042101136" className="hover:text-white transition-colors">
                  404-210-1136
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm justify-center sm:justify-start">
                <Mail className="h-5 w-5 text-grm-primary shrink-0 hidden sm:block" />
                <a href="mailto:grmmedia16@gmail.com" className="hover:text-white transition-colors">
                  grmmedia16@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4 sm:mb-6">
              Have questions or want to connect? We&apos;d love to hear from you. Reach out anytime.
            </p>
            <Link href="/contact" className="inline-block">
              <Button className="w-auto bg-grm-primary hover:bg-grm-secondary text-white cursor-pointer text-sm sm:text-base py-5 sm:py-6 px-8">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 sm:mt-16 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Great Redemption Ministries. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
