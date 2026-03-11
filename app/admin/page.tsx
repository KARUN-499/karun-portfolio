'use client'
import { useState, useEffect } from 'react'

const ADMIN_KEY = 'karun2024admin'

type Booking = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  status: 'pending' | 'confirmed' | 'completed'
  paymentId?: string
}

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/bookings', { headers: { 'x-admin-key': ADMIN_KEY } })
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch {
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthorized) fetchBookings()
  }, [isAuthorized])

  const handleLogin = () => {
    if (password === ADMIN_KEY) {
      setIsAuthorized(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify({ status }),
      })
      fetchBookings()
    } catch {
      setError('Failed to update status')
    }
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4 text-3xl">
              🔒
            </div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Enter your admin password to continue</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="input-field w-full"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button onClick={handleLogin} className="btn-primary w-full">Access Dashboard</button>
          </div>
        </div>
      </main>
    )
  }

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📅', color: 'text-violet-400' },
    { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: '⏳', color: 'text-yellow-400' },
    { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: '✅', color: 'text-emerald-400' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: '💳', color: 'text-blue-400' },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-64 min-h-screen border-r border-white/10 p-6 flex flex-col">
          <div className="mb-8">
            <h2 className="font-bold text-lg">Admin Panel</h2>
            <p className="text-white/40 text-xs">karun-portfolio</p>
          </div>
          <nav className="space-y-1 flex-1">
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'bookings', label: '📅 Bookings' },
              { id: 'contacts', label: '✉️ Contacts' },
              { id: 'clients', label: '👥 Clients' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setIsAuthorized(false)}
            className="text-white/40 hover:text-white text-sm transition-colors text-left"
          >
            🚪 Logout
          </button>
        </aside>

        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <div key={i} className="card">
                    <div className="text-2xl mb-3">{s.icon}</div>
                    <div className="text-3xl font-bold mb-1">{s.value}</div>
                    <div className="text-white/50 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 className="font-semibold mb-4">Recent Bookings</h3>
                {loading ? (
                  <p className="text-white/50 text-sm">Loading...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-white/50 text-sm">No bookings yet.</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map(b => (
                      <div key={b.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <div className="font-medium text-sm">{b.name}</div>
                          <div className="text-white/40 text-xs">{b.service} · {b.date}</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full border ${
                          b.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                          b.status === 'confirmed' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                          'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                        }`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
              {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
              {loading ? (
                <p className="text-white/50">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {bookings.map(b => (
                    <div key={b.id} className="card flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-medium">{b.name}</div>
                        <div className="text-white/40 text-sm">{b.email} · {b.phone}</div>
                        <div className="text-white/50 text-sm mt-1">{b.service} · {b.date}</div>
                      </div>
                      <select
                        value={b.status}
                        onChange={e => updateStatus(b.id, e.target.value)}
                        className="text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  ))}
                  {bookings.length === 0 && <p className="text-white/50">No bookings found.</p>}
                </div>
              )}
            </div>
          )}

          {(activeTab === 'contacts' || activeTab === 'clients') && (
            <div>
              <h1 className="text-2xl font-bold mb-6">{activeTab === 'contacts' ? 'Contacts' : 'Clients'}</h1>
              <div className="card text-center py-12">
                <div className="text-4xl mb-4">✉️</div>
                <p className="text-white/50">Coming soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
