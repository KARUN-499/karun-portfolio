const projects = [
  {
    title: 'E-Commerce Website',
    category: 'Web Development',
    desc: 'Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Brand Identity Package',
    category: 'Graphic Design',
    desc: 'Complete brand identity including logo, color palette, typography, and brand guidelines.',
    tech: ['Figma', 'Illustrator', 'Photoshop'],
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Digital Marketing Campaign',
    category: 'Digital Marketing',
    desc: 'Social media and Google Ads campaign that increased client revenue by 300% in 3 months.',
    tech: ['Google Ads', 'Meta Ads', 'Analytics'],
    color: 'from-blue-500 to-cyan-600',
  },
  {
    title: 'SEO Optimization',
    category: 'SEO',
    desc: 'Comprehensive SEO audit and optimization that improved organic traffic by 250%.',
    tech: ['Ahrefs', 'SEMrush', 'GSC'],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Mobile App UI',
    category: 'UI/UX Design',
    desc: 'Clean and intuitive mobile app design with smooth user flows and modern aesthetics.',
    tech: ['Figma', 'Framer', 'Prototyping'],
    color: 'from-orange-500 to-amber-600',
  },
  {
    title: 'Content Strategy',
    category: 'Content Marketing',
    desc: 'End-to-end content strategy and creation that drove 10x engagement growth.',
    tech: ['WordPress', 'Canva', 'Analytics'],
    color: 'from-red-500 to-pink-600',
  },
]

const categories = ['All', 'Web Development', 'Graphic Design', 'Digital Marketing', 'SEO', 'UI/UX Design', 'Content Marketing']

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4 block">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Portfolio &amp; <span className="text-gradient">Case Studies</span>
          </h1>
          <p className="text-white/60 text-lg">
            Real results for real businesses. Explore our work across web development, design, and marketing.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="card group hover:border-white/20 transition-all duration-300">
                <div className={`h-40 rounded-lg bg-gradient-to-br ${p.color} mb-5 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{p.category}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-violet-400 transition-colors">{p.title}</h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/10 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a project in mind?</h2>
          <p className="text-white/60 mb-8">Let&apos;s create something amazing together.</p>
          <a href="/booking" className="btn-primary">Start a Project</a>
        </div>
      </section>
    </main>
  )
}
