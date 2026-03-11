import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karun Rathee - Professional Portfolio',
  description: 'Expert web development, graphic design, and digital marketing services',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-400">Karun Rathee</Link>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-blue-400">Home</Link>
              <Link href="/about" className="hover:text-blue-400">About</Link>
              <Link href="/services" className="hover:text-blue-400">Services</Link>
              <Link href="/portfolio" className="hover:text-blue-400">Portfolio</Link>
              <Link href="/booking" className="hover:text-blue-400">Book Now</Link>
              <Link href="/contact" className="hover:text-blue-400">Contact</Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-900 text-white text-center p-6 mt-10">
          <p>&copy; 2024 Karun Rathee. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-1">admin@yourdomain.com</p>
        </footer>
      </body>
    </html>
  )
}
