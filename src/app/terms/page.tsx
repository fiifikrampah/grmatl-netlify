import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Great Redemption Ministries',
  description: 'Terms of service for using the Great Redemption Ministries website and services.',
}

export default function TermsPage() {
  return (
    <div className="bg-white pt-24 pb-16 md:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-600 mb-12">Terms governing your use of our website and services.</p>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-8">
          <p className="text-sm text-gray-500">Last updated: January 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the website of Great Redemption Ministries (&quot;GRM,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) at grmatl.org or related pages, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Use of the Website</h2>
            <p>
              Our website is provided for informational purposes, to learn about our ministry, events, and ways to connect or give. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site.
            </p>
            <p className="mt-4">
              You may not use the website to transmit harmful, offensive, or illegal content, or to attempt to gain unauthorized access to our systems or data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Event Registration and Participation</h2>
            <p>
              When you register for an event (e.g., baptism, Heart to Heart Prayer Breakfast, Summer Camp), you may be asked to provide personal information. By registering, you agree to provide accurate information and to our use of that information as described in our <Link href="/privacy" className="text-grm-primary hover:underline">Privacy Policy</Link>. Event details, dates, and requirements are subject to change; we will communicate updates when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Donations and Giving</h2>
            <p>
              Donations and gifts made through our website or linked platforms (e.g., Tithely, Zelle, Cash App) are voluntary. Refund requests may be considered on a case-by-case basis; please contact us for any concerns. We are grateful for your support and use gifts to further our ministry and community outreach.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Third-Party Links and Services</h2>
            <p>
              Our website may contain links to third-party sites (e.g., social media, giving platforms, maps). We are not responsible for the content, privacy practices, or terms of those sites. Use of third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Intellectual Property</h2>
            <p>
              Content on this website (text, images, logos, and other materials) is owned by Great Redemption Ministries or used with permission. You may not copy, reproduce, or distribute our content for commercial purposes without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided &quot;as is.&quot; We do not warrant that the site will be uninterrupted, error-free, or free of harmful components. Your use of the website is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Great Redemption Ministries and its leaders, staff, and volunteers shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or participation in events or activities promoted through it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. The &quot;Last updated&quot; date at the top will reflect the most recent version. Continued use of the website after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
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
