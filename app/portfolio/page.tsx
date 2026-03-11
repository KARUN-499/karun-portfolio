import Link from 'next/link'

const projects = [
  { title: 'E-Commerce Website', category: 'Web Development', desc: 'Full-stack e-commerce platform with payment integration, admin dashboard, and inventory management.', tech: ['Next.js', 'Tailwind CSS', 'Stripe'], color: 'bg-blue-100' },
  { title: 'Brand Identity Package', category: 'Graphic Design', desc: 'Complete brand identity including logo, color palette, typography, and brand guidelines for a startup.', tech: ['Adobe Illustrator', 'Figma', 'Canva'], color: 'bg-purple-100' },
  { title: 'Digital Marketing Campaign', category: 'Digital Marketing', desc: 'Social media and Google Ads campaign that increased client revenue by 40% in 3 months.', tech: ['Google Ads', 'Facebook Ads', 'Analytics'], color: 'bg-green-100' },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">My Portfolio</h1>
        <p className="text-center text-gray-600 mb-12">A selection of my recent work across web development, design, and marketing</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.title} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div className={`${p.color} h-48 flex items-center justify-center`}>
                <span className="text-6xl">🖥️</span>
              </div>
              <div className="p-6">
                <span className="text-xs text-blue-600 font-semibold uppercase">{p.category}</span>
                <h3 className="text-xl font-bold mt-1 mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => <span key={t} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Interested in working together?</p>
          <Link href="/booking" className="bg-blue-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-blue-700">Start a Project</Link>
        </div>
      </div>
    </main>
  )
}
