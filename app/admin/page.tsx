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
  budget: string
  message: string
  status: string
  createdAt: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_KEY) { setLoggedIn(true); fetchBookings() }
    else setError('Wrong password')
  }

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', { headers: { 'x-admin-key': ADMIN_KEY } })
      const data = await res.json()
      setBookings(data.bookings || [])
    } catch { setError('Failed to load bookings') }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
      body: JSON.stringify({ id, status })
    })
    setBookings(prev => prev.map(b => b.id === id ? {...b, status} : b))
  }

  useEffect(() => { if (loggedIn) fetchBookings() }, [loggedIn])

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter
    const matchSearch = b.name?.toLowerCase().includes(search.toLowerCase()) || b.email?.toLowerCase().includes(search.toLowerCase()) || b.service?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  if (!loggedIn) return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-white text-2xl mx-auto mb-4">🔐</div>
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
          <p className="text-slate-400 mt-2">Enter your admin password</p>
        </div>
        <form onSubmit={login} className="space-y-4">
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password" className="w-full" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full py-4">Login to Dashboard</button>
        </form>
        <p className="text-slate-600 text-xs text-center mt-6">Default password: karun2024admin</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen gradient-bg">
      {/* Admin Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-black text-white">📊</div>
            <div><h1 className="text-white font-bold">Admin Dashboard</h1><p className="text-slate-400 text-xs">Karun Rathee Portfolio</p></div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchBookings} className="glass px-4 py-2 rounded-xl text-slate-300 text-sm hover:text-white transition-colors">🔄 Refresh</button>
            <button onClick={()=>setLoggedIn(false)} className="text-slate-400 hover:text-red-400 text-sm transition-colors">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[{label:'Total Bookings',value:stats.total,color:'from-indigo-500/20 to-indigo-500/5',icon:'📊'},{label:'Pending',value:stats.pending,color:'from-yellow-500/20 to-yellow-500/5',icon:'⏳'},{label:'Confirmed',value:stats.confirmed,color:'from-blue-500/20 to-blue-500/5',icon:'✅'},{label:'Completed',value:stats.completed,color:'from-green-500/20 to-green-500/5',icon:'🌟'}].map(s=>(
            <div key={s.label} className={`glass rounded-2xl p-6 bg-gradient-to-br ${s.color}`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-black text-white">{s.value}</div>
              <div className="text-slate-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search by name, email, service..." className="flex-1" />
            <div className="flex gap-2">
              {['all','pending','confirmed','completed','cancelled'].map(s=>(
                <button key={s} onClick={()=>setFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter===s?'bg-indigo-500 text-white':'glass text-slate-400 hover:text-white'}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="glass rounded-2xl p-20 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-slate-400">Loading bookings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass rounded-2xl p-20 text-center">
            <div className="text-6xl mb-4">📥</div>
            <h3 className="text-white font-bold text-xl mb-2">No bookings yet</h3>
            <p className="text-slate-400">When clients submit the booking form, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(b => (
              <div key={b.id} className="glass rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">{b.name?.charAt(0)?.toUpperCase()}</div>
                      <div>
                        <p className="text-white font-bold">{b.name}</p>
                        <p className="text-slate-400 text-sm">{b.email} {b.phone && `· ${b.phone}`}</p>
                      </div>
                      <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor[b.status] || statusColor.pending} capitalize`}>{b.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm ml-13">
                      <span className="glass px-3 py-1 rounded-lg text-indigo-400">💼 {b.service}</span>
                      {b.date && <span className="glass px-3 py-1 rounded-lg text-slate-400">📅 {b.date}</span>}
                      {b.budget && <span className="glass px-3 py-1 rounded-lg text-slate-400">💰 {b.budget}</span>}
                      <span className="glass px-3 py-1 rounded-lg text-slate-500 text-xs">{new Date(b.createdAt).toLocaleString('en-IN')}</span>
                    </div>
                    {b.message && <p className="text-slate-400 text-sm mt-3 ml-13 pl-1 border-l-2 border-indigo-500/30">{b.message}</p>}
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {['pending','confirmed','completed','cancelled'].map(s=>(
                      <button key={s} onClick={()=>updateStatus(b.id, s)} className={`px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${b.status===s?'bg-indigo-500 text-white':'glass text-slate-400 hover:text-white'}`}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
