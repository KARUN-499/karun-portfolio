import Link from 'next/link'

const services = [
  { title: 'Web Development', price: '₹5,000', desc: 'Custom websites built with Next.js, React, and modern tech. Responsive, fast, and SEO-friendly.', features: ['Custom Design', 'Mobile Responsive', 'SEO Optimized', '3 Revisions'] },
  { title: 'Graphic Design', price: '₹2,000', desc: 'Professional logos, banners, social media graphics, and complete brand identity packages.', features: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Print Materials'] },
  { title: 'Digital Marketing', price: '₹3,000', desc: 'Grow your online presence with targeted campaigns on Google, Facebook, and Instagram.', features: ['Social Media Management', 'Google Ads', 'Facebook Ads', 'Monthly Reports'] },
  { title: 'Mobile App Development', price: '₹15,000', desc: 'Cross-platform mobile apps for iOS and Android using React Native.', features: ['iOS & Android', 'UI/UX Design', 'API Integration', 'App Store Submission'] },
  { title: 'SEO Optimization', price: '₹2,500', desc: 'Rank higher on Google with proven white-hat SEO strategies and keyword optimization.', features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Monthly Analytics'] },
  { title: 'Content Writing', price: '₹1,500', desc: 'Engaging, SEO-friendly content for your website, blog, and social media channels.', features: ['Blog Posts', 'Website Copy', 'Product Descriptions', 'Social Media Posts'] },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">My Services</h1>
        <p className="text-center text-gray-600 mb-12">Professional digital services tailored to your needs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white border rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-blue-600 font-bold text-2xl mb-3">Starting at {s.price}</p>
              <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
              <ul className="space-y-1 mb-6">
                {s.features.map(f => <li key={f} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-green-500">✓</span>{f}</li>)}
              </ul>
              <Link href="/booking" className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
