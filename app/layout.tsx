import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Karun Rathee — Web Developer & Designer',
  description: 'Professional portfolio of Karun Rathee. Expert web development, graphic design, and digital marketing services.',
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">K</div>
              <span className="font-semibold text-white">Karun Rathee</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(item => (
                <Link key={item.href} href={item.href}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/booking" className="btn-primary text-sm py-2 px-5">
              Book Now
            </Link>
          </div>
        </nav>

        <div className="pt-16">{children}</div>

        {/* Footer */}
        <footer style={{background:'#080808', borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">K</div>
                  <span className="font-semibold text-white">Karun Rathee</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Delivering premium digital solutions to help your business grow online.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Services</h4>
                <div className="flex flex-col gap-2">
                  {['Web Development','Graphic Design','Digital Marketing','SEO Optimization','Content Writing'].map(s => (
                    <Link key={s} href="/services" className="text-sm text-slate-500 hover:text-white transition-colors">{s}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-4">Contact</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <span>karunsingh5228@gmail.com</span>
                  <span>Adda Jhungian, Punjab</span>
                  <span>Mon–Sat: 9AM–7PM IST</span>
                </div>
              </div>
            </div>
            <div className="divider mb-6"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
              <span>© 2024 Karun Rathee. All rights reserved.</span>
              <Link href="/admin" className="hover:text-slate-400 transition-colors">Admin</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
