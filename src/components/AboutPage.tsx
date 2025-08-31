import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Users, BookOpen, Home, Heart } from 'lucide-react'

export default function AboutPage() {
  const ministries = [
    {
      icon: Home,
      title: "Place Of Haven",
      description: "Here at Great Redemption Ministries, we are family. We love each and everyone the same, just as God first loved us.",
    },
    {
      icon: Users,
      title: "Connects Groups",
      description: "Our various ministries include: Men and Women Fellowship, The Eagles Generation, Redemption in Motion, Children Ministry.",
    },
    {
      icon: BookOpen,
      title: "Study Bible",
      description: "We believe in the entirety of The Bible and abide by it. We regard The Word of God as the sole and whole truth.",
    },
    {
      icon: Heart,
      title: "House of prayer",
      description: "Just as the Bible encourages believers to pray without ceasing, Great Redemption Ministries members act in one accord when it comes to prayer.",
    },
  ]

  return (
    <div className="space-y-0">
      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-grm-blue-100 rounded-lg"></div>
              <Image
                src="/images/founder.jpg"
                alt="Pastor Andrews Frimpong"
                width={1400}
                height={1050}
                className="relative z-10 rounded-lg shadow-xl"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Meet Our Founder
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-grm-primary">
                A Man Devoted to the things of God
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Pastor Andrews Frimpong (1954 - 2024) was a true vessel of The Lord and was endowed
                  with the Gift of Healing. He founded Great Redemption Ministries Inc., dedicating his
                  life to spreading the word of God and serving the community. As the General Overseer,
                  his unwavering faith and compassionate leadership guided our congregation through many
                  years of spiritual growth and healing.
                </p>
                <p>
                  Pastor Frimpong&apos;s legacy lives on through the lives he touched and the ministry he built.
                  His vision and dedication continue to inspire and guide us every day. He was a loving husband,
                  father, and grandfather, whose spirit and commitment to faith are carried forward by his family
                  and the church at large.
                </p>
                <p>
                  Though he is no longer with us, Pastor Frimpong&apos;s presence remains strong in the hearts of all
                  who knew him. We honor his memory and strive to uphold the values and mission he instilled in our church.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church Beliefs Section */}
      <section className="py-20 bg-gradient-to-br from-grm-blue-50 to-grm-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            We are a Church That Believes in{' '}
            <span className="underline decoration-grm-primary decoration-4">Jesus</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Great Redemption Ministries, we know that inspiration opens hearts. An open heart is an open mind
            and an open mind is one that can practice tolerance, experience gratitude and feel the glory of God.
            It is our belief that God is present in all of us, but His active presence can only be felt through
            faith in Him. We are dedicated to the service of God and all His people, and our goal is to inspire
            you through the holiness of our dwelling and our services. We invite you to become a part of our growing congregation.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon
              return (
                <Card key={index} className="h-full">
                  <CardContent className="p-8">
                    <Icon className="h-12 w-12 text-grm-primary mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{ministry.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{ministry.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <Image
              src="/images/about-1.jpg"
              alt="Church history"
              width={600}
              height={400}
              className="rounded-lg"
            />

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our History
              </h2>
              <blockquote className="text-xl font-semibold text-grm-primary border-l-4 border-grm-primary pl-6 italic">
                &ldquo;Therefore if The Son makes you free, you shall be free indeed.&rdquo;
                <br />
                <span className="text-sm font-normal">John 8:36 NKJV</span>
              </blockquote>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  This quotation from John 8:36, was the foundational scripture of the establishment of
                  Great Redemption Ministries Inc. in 2006. The name &ldquo;Great Redemption Ministries&rdquo; was therefore
                  brought about as an inspiration from a pastor when Mr. Andrews Frimpong received the calling
                  to establish the church.
                </p>
              </div>
            </div>
          </div>

          {/* Statement of Beliefs */}
          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Our Statement of Beliefs
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We affirm the Holy Bible as the inspired Word of God and the basis for our belief.
                  We voluntarily band ourselves together as a body of baptized believers in Jesus Christ
                  personally committed to sharing the good news of salvation to lost mankind.
                </p>
              </div>
              <Image
                src="/images/about-2.jpg"
                alt="Church community"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
