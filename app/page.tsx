import Link from 'next/link'

const services = [
  { icon: '💻', title: 'Web Development', price: '₹5,000', desc: 'Custom websites built with Next.js & React', color: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/20' },
  { icon: '🎨', title: 'Graphic Design', price: '₹2,000', desc: 'Logos, banners & complete brand identities', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20' },
  { icon: '📈', title: 'Digital Marketing', price: '₹3,000', desc: 'Google Ads, Facebook & social media growth', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/20' },
  { icon: '📱', title: 'Mobile Apps', price: '₹15,000', desc: 'Cross-platform iOS & Android apps', color: 'from-green-500/20 to-green-500/5', border: 'border-green-500/20' },
  { icon: '🔍', title: 'SEO Optimization', price: '₹2,500', desc: 'Rank higher on Google with proven strategies', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/20' },
  { icon: '✏️', title: 'Content Writing', price: '₹1,500', desc: 'Engaging SEO-friendly content for your brand', color: 'from-pink-500/20 to-pink-500/5', border: 'border-pink-500/20' },
]

const testimonials = [
  { name: 'Rahul Sharma', role: 'Business Owner', review: 'Karun delivered an exceptional website that doubled our online conversions. Truly world-class work!', rating: 5, avatar: 'RS' },
  { name: 'Priya Singh', role: 'Startup Founder', review: 'The brand identity package was beyond my expectations. Professional, creative, and delivered on time.', rating: 5, avatar: 'PS' },
  { name: 'Amit Kumar', role: 'E-commerce Owner', review: 'Our sales increased by 40% after the digital marketing campaign. Best investment we made!', rating: 5, avatar: 'AK' },
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
      <section className="gradient-bg min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8 text-sm text-indigo-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Available for new projects
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 text-white">
              Hi, I&apos;m <span className="gradient-text">Karun</span><br />Rathee
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-4 font-medium">Web Developer · Graphic Designer · Digital Marketer</p>
            <p className="text-slate-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">I craft exceptional digital experiences that drive real business results. From stunning websites to powerful marketing campaigns.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary text-lg px-10 py-4">Book Free Consultation</Link>
              <Link href="/portfolio" className="btn-secondary text-lg px-10 py-4">View My Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-indigo-400 font-semibold mb-3 uppercase tracking-widest text-sm">What I Do</p>
          <h2 className="section-title text-white">Services <span className="gradient-text">I Offer</span></h2>
          <p className="section-subtitle">Premium digital services crafted to help your business stand out and grow</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className={`glass card-hover rounded-2xl p-8 bg-gradient-to-br ${s.color} border ${s.border}`}>
                <div className="text-4xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-indigo-400 font-bold text-lg mb-3">Starting at {s.price}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link href="/booking" className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors flex items-center gap-2">Get Started →</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary px-10 py-4 inline-block">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-indigo-400 font-semibold mb-3 uppercase tracking-widest text-sm">Testimonials</p>
          <h2 className="section-title text-white">What Clients <span className="gradient-text">Say</span></h2>
          <p className="section-subtitle">Real feedback from real clients who trusted me with their projects</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="glass card-hover rounded-2xl p-8">
                <div className="flex text-yellow-400 text-xl mb-5">{'★'.repeat(t.rating)}</div>
                <p className="text-slate-300 leading-relaxed mb-6 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">{t.avatar}</div>
                  <div><p className="text-white font-semibold">{t.name}</p><p className="text-slate-500 text-sm">{t.role}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden pulse-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-4">Ready to Build Something <span className="gradient-text">Amazing?</span></h2>
              <p className="text-slate-400 text-lg mb-10">Let&apos;s work together to bring your vision to life. Free consultation — no strings attached.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking" className="btn-primary text-lg px-12 py-4">Book Free Call</Link>
                <Link href="/contact" className="btn-secondary text-lg px-12 py-4">Send Message</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
