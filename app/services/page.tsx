import Link from 'next/link'

const services = [
  {
    icon: '💻', title: 'Web Development', price: '₹5,000',
    desc: 'Custom websites & web apps built with Next.js, React and modern technologies.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Admin Dashboard'],
  },
  {
    icon: '🎨', title: 'Graphic Design', price: '₹2,000',
    desc: 'Professional logos, brand identities, banners and marketing materials.',
    features: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Print Design'],
  },
  {
    icon: '📈', title: 'Digital Marketing', price: '₹3,000',
    desc: 'Drive targeted traffic and grow your business with data-driven campaigns.',
    features: ['Google Ads', 'Facebook Ads', 'Social Media', 'Analytics Reports'],
  },
  {
    icon: '📱', title: 'Mobile Apps', price: '₹15,000',
    desc: 'Cross-platform iOS & Android apps built with React Native.',
    features: ['iOS & Android', 'Push Notifications', 'Offline Support', 'App Store Publish'],
  },
  {
    icon: '🔍', title: 'SEO Optimization', price: '₹2,500',
    desc: 'Rank higher on Google and drive organic traffic to your website.',
    features: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Monthly Reports'],
  },
  {
    icon: '✏️', title: 'Content Writing', price: '₹1,500',
    desc: 'Engaging, SEO-friendly content that resonates with your audience.',
    features: ['Blog Articles', 'Website Copy', 'Product Descriptions', 'Social Content'],
  },
]

export default function Services() {
  return (
    <main>
      <section style={{background:'#000', padding:'80px 0 60px'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="section-label mb-4">Services</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Services I Offer</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Premium digital services tailored to your business needs</p>
        </div>
      </section>
      <div className="divider"></div>
      <section style={{background:'#000', padding:'80px 0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <div className="text-indigo-400 font-bold mb-3">Starting at {s.price}</div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="text-indigo-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary text-sm w-full block text-center">Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{background:'#080808', padding:'80px 0', borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Need a Custom Package?</h2>
          <p className="text-slate-500 mb-8">Contact me to discuss your specific requirements and get a custom quote.</p>
          <Link href="/contact" className="btn-primary">Get Custom Quote</Link>
        </div>
      </section>
    </main>
  )
}
