import Link from 'next/link'

const services = [
  { icon: '💻', title: 'Web Development', price: '₹5,000', desc: 'Custom websites built with Next.js & React' },
  { icon: '🎨', title: 'Graphic Design', price: '₹2,000', desc: 'Logos, banners & complete brand identities' },
  { icon: '📈', title: 'Digital Marketing', price: '₹3,000', desc: 'Google Ads, Facebook & social media growth' },
  { icon: '📱', title: 'Mobile Apps', price: '₹15,000', desc: 'Cross-platform iOS & Android apps' },
  { icon: '🔍', title: 'SEO Optimization', price: '₹2,500', desc: 'Rank higher on Google with proven strategies' },
  { icon: '✏️', title: 'Content Writing', price: '₹1,500', desc: 'Engaging SEO-friendly content for your brand' },
]

const testimonials = [
  { name: 'Rahul Sharma', role: 'Business Owner', review: 'Karun delivered an exceptional website that doubled our online conversions. Truly world-class work!', avatar: 'RS' },
  { name: 'Priya Singh', role: 'Startup Founder', review: 'The brand identity package was beyond my expectations. Professional, creative, and delivered on time.', avatar: 'PS' },
  { name: 'Amit Kumar', role: 'E-commerce Owner', review: 'Our sales increased by 40% after the digital marketing campaign. Best investment we made!', avatar: 'AK' },
]

const stats = [
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '3+', label: 'Years Experience' },
  { value: '100%', label: 'Satisfaction Rate' },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="hero-bg min-h-screen flex items-center" style={{paddingTop:'80px'}}>
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="tag mb-6">✨ Available for new projects</div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
            Hi, I’m{' '}
            <span className="gradient-text-purple">Karun</span>
            <br />Rathee
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-4 font-medium">
            Web Developer · Graphic Designer · Digital Marketer
          </p>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            I craft exceptional digital experiences that drive real business results. From stunning websites to powerful marketing campaigns.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="btn-primary">Book Free Consultation</Link>
            <Link href="/portfolio" className="btn-secondary">View My Work</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{background:'#080808', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="stat-card">
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-dark" style={{padding:'96px 0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-label mb-3">What I Do</div>
            <h2 className="section-title">Services I Offer</h2>
            <p className="section-subtitle">Premium digital services crafted to help your business stand out and grow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => (
              <div key={s.title} className="service-card">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{s.title}</h3>
                <div className="text-indigo-400 text-sm font-semibold mb-3">Starting at {s.price}</div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <Link href="/contact" className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold">Get Started →</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-dark-2" style={{padding:'96px 0'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="section-label mb-3">Testimonials</div>
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-subtitle">Real feedback from real clients who trusted me with their projects</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="glass-card p-6">
                <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">{t.avatar}</div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-slate-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'#080808', padding:'96px 0', borderTop:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="section-label mb-4">Ready to Start?</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">Build Something Amazing Together</h2>
          <p className="text-slate-500 text-lg mb-10">Free consultation — no strings attached. Let’s bring your vision to life.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking" className="btn-primary">Book Free Call</Link>
            <Link href="/contact" className="btn-secondary">Send Message</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
