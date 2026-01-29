import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Great Redemption Ministries',
  description: 'Privacy policy for Great Redemption Ministries. Learn how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white pt-24 pb-16 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-600 mb-12">How we collect, use, and protect your information.</p>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-8">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
            <p>
              Great Redemption Ministries (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) may collect information you provide when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Contact us through our website or by email or phone</li>
              <li>Register for events (e.g., baptism, Heart to Heart Prayer Breakfast, Summer Camp)</li>
              <li>Subscribe to communications (if applicable)</li>
              <li>Make a donation or give through our giving platforms</li>
            </ul>
            <p className="mt-4">
              This may include your name, email address, phone number, and any message or details you choose to share.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Respond to your inquiries and provide the services you request</li>
              <li>Process event registrations and send you related updates</li>
              <li>Send ministry updates or event reminders, if you have agreed to receive them</li>
              <li>Process donations and maintain records as required for our ministry and legal obligations</li>
              <li>Improve our website and ministry offerings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. We Do Not Sell Your Information</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share information only with trusted service providers who assist us in operating our website or ministry (e.g., hosting, email delivery), and only to the extent necessary for those purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Cookies and Similar Technologies</h2>
            <p>
              Our website may use cookies or similar technologies to improve your experience (e.g., remembering preferences). You can adjust your browser settings to limit or block cookies if you prefer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Security</h2>
            <p>
              We take reasonable steps to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Your Choices</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by contacting us at the email or address below. You may also opt out of ministry communications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top will reflect the most recent version. Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our practices, please contact us:
            </p>
            <p className="mt-4">
              <strong>Great Redemption Ministries</strong><br />
              24 Geneva St, Hapeville, GA 30354<br />
              Email: <a href="mailto:grmmedia16@gmail.com" className="text-grm-primary hover:underline">grmmedia16@gmail.com</a><br />
              Phone: <a href="tel:+14042101136" className="text-grm-primary hover:underline">404-210-1136</a>
            </p>
          </section>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-grm-primary font-semibold hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
