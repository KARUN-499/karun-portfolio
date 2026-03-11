import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Karun Rathee — Web Developer & Designer',
  description: 'Professional portfolio of Karun Rathee. Expert web development, graphic design, and digital marketing services in Punjab, India.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-white text-lg">K</div>
              <span className="text-white font-bold text-xl tracking-tight">Karun Rathee</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/portfolio', label: 'Portfolio' },
                { href: '/contact', label: 'Contact' },
              ].map(item => (
                <Link key={item.href} href={item.href} className="text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium">{item.label}</Link>
              ))}
              <Link href="/booking" className="btn-primary text-sm px-6 py-3 rounded-xl">Book Now</Link>
            </div>
          </div>
        </nav>
        <div className="pt-[72px]">{children}</div>
        <footer className="border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-white text-lg">K</div>
                  <span className="text-white font-bold text-xl">Karun Rathee</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">Delivering world-class digital solutions to help your business grow. Available for freelance projects across India.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Services</h4>
                <div className="space-y-2">{['Web Development','Graphic Design','Digital Marketing','SEO','Content Writing'].map(s=><p key={s} className="text-slate-400 text-sm hover:text-indigo-400 cursor-pointer transition-colors">{s}</p>)}</div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-slate-400 text-sm">
                  <p>karunsingh5228@gmail.com</p>
                  <p>Adda Jhungian, Punjab</p>
                  <p>Mon–Sat: 9AM–7PM IST</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">&copy; 2024 Karun Rathee. All rights reserved.</p>
              <Link href="/admin" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">Admin Panel</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
