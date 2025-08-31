// import Link from 'next/link' // Not used in this component
import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'
import { FaXTwitter } from "react-icons/fa6"

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/greatredemptionministies/',
    icon: Facebook,
  },
  {
    name: 'X',
    href: 'https://x.com/grmatl',
    icon: FaXTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/grm_atl/',
    icon: Instagram,
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Great Redemption Ministries"
              width={60}
              height={60}
              className="brightness-0 invert"
            />
            <p className="text-gray-300 max-w-md">
              At Great Redemption Ministries, we know that inspiration opens hearts.
              An open heart is an open mind and an open mind is one that can practice
              tolerance, experience gratitude and feel the glory of God.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            Copyright © {currentYear} Great Redemption Ministries Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
