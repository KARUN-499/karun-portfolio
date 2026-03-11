'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  FiGrid, FiPackage, FiBriefcase, FiCalendar, FiSettings, 
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiUsers,
  FiTrendingUp, FiMail, FiPhone, FiGlobe, FiLock, FiCheckCircle, FiCreditCard
} from 'react-icons/fi'

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

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings', {
        headers: { 'x-admin-key': ADMIN_KEY }
      })
      setBookings(res.data.bookings)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (isAuthorized) {
      fetchBookings()
      const interval = setInterval(fetchBookings, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthorized])

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await axios.patch('/api/bookings', { id, status }, {
        headers: { 'x-admin-key': ADMIN_KEY }
      })
      fetchBookings()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    try {
      await axios.delete(`/api/bookings?id=${id}`, {
        headers: { 'x-admin-key': ADMIN_KEY }
      })
      fetchBookings()
    } catch (err) {
      alert('Failed to delete')
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_KEY) {
      setIsAuthorized(true)
    } else {
      alert('Invalid admin key')
    }
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-[#111] p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <FiLock className="text-blue-400 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Panel</h1>
              <p className="text-gray-400 mb-8">Enter your access key to manage your portfolio.</p>
              <form onSubmit={handleLogin} className=\"space-y-4\">
                <input
                  type=\"password\"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=\"Enter Admin Key\"
                  className=\"w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all\"
                />
                <button className=\"w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]\">
                  Unlock Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=\"min-h-screen bg-[#0a0a0a] text-white flex\">
      <aside className=\"w-72 bg-[#111] border-r border-white/5 flex flex-col p-6 fixed h-full z-50\">
        <div className=\"flex items-center gap-3 mb-12 px-2\">
          <div className=\"w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl\">K</div>
          <span className=\"font-bold text-xl tracking-tight\">Karun<span className=\"text-blue-500\">.</span>Admin</span>
        </div>
        <nav className=\"flex-1 space-y-2\">
          {[
            { id: 'dashboard', icon: FiGrid, label: 'Dashboard' },
            { id: 'bookings', icon: FiCalendar, label: 'Bookings' },
            { id: 'settings', icon: FiSettings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${
                activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 font-medium' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className=\"text-xl\" />
              {item.label}
            </button>
          ))}
        </nav>
        <button 
          onClick={() => setIsAuthorized(false)}
          className=\"mt-auto flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-400/5 transition-all\"
        >
          <FiLogOut className=\"text-xl\" />
          Logout
        </button>
      </aside>

      <main className=\"flex-1 ml-72 p-10\">
        <header className=\"flex justify-between items-center mb-10\">
          <div>
            <h2 className=\"text-3xl font-bold tracking-tight\">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className=\"text-gray-500 mt-1\">Manage your professional presence.</p>
          </div>
          <div className=\"flex gap-4\">
            <a href=\"/\" target=\"_blank\" className=\"bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-white/10 transition-all\">
              <FiExternalLink /> Live Site
            </a>
          </div>
        </header>

        <div className=\"animate-in fade-in slide-in-from-bottom-4 duration-500\">
          {activeTab === 'dashboard' && (
            <div className=\"space-y-8\">
              <div className=\"grid grid-cols-3 gap-6\">
                {[
                  { label: 'Total Bookings', value: bookings.length, icon: FiCalendar, color: 'text-blue-400' },
                  { label: 'New Requests', value: bookings.filter(b => b.status === 'pending').length, icon: FiMail, color: 'text-orange-400' },
                  { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: FiTrendingUp, color: 'text-emerald-400' },
                ].map((stat, i) => (
                  <div key={i} className=\"bg-[#111] p-6 rounded-[24px] border border-white/5 hover:border-white/10 transition-all\">
                    <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                      <stat.icon className=\"text-2xl\" />
                    </div>
                    <p className=\"text-gray-400 text-sm\">{stat.label}</p>
                    <h3 className=\"text-3xl font-bold mt-1\">{stat.value}</h3>
                  </div>
                ))}
              </div>
              
              <div className=\"bg-[#111] rounded-[32px] border border-white/5 overflow-hidden\">
                <div className=\"p-6 border-b border-white/5 flex justify-between items-center\">
                  <h3 className=\"text-xl font-bold\">Recent Activity</h3>
                  <button onClick={() => setActiveTab('bookings')} className=\"text-blue-400 text-sm hover:underline\">View All</button>
                </div>
                <table className=\"w-full text-left\">
                  <thead>
                    <tr className=\"text-gray-500 text-sm\">
                      <th className=\"px-6 py-4 font-medium\">Client</th>
                      <th className=\"px-6 py-4 font-medium\">Service</th>
                      <th className=\"px-6 py-4 font-medium\">Payment</th>
                      <th className=\"px-6 py-4 font-medium\">Status</th>
                    </tr>
                  </thead>
                  <tbody className=\"divide-y divide-white/5\">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className=\"hover:bg-white/[0.02] transition-all\">
                        <td className=\"px-6 py-5\">
                          <div className=\"font-medium\">{b.name}</div>
                          <div className=\"text-xs text-gray-500\">{b.email}</div>
                        </td>
                        <td className=\"px-6 py-5 text-gray-300\">{b.service}</td>
                        <td className=\"px-6 py-5\">
                          {b.paymentId ? (
                            <span className=\"text-emerald-400 flex items-center gap-1 text-xs\">
                              <FiCheckCircle size={12}/> Paid
                            </span>
                          ) : (
                            <span className=\"text-gray-500 text-xs italic\">Unpaid</span>
                          )}
                        </td>
                        <td className=\"px-6 py-5\">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                            b.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                          }`}>
                            {b.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className=\"bg-[#111] rounded-[32px] border border-white/5 overflow-hidden\">
              <div className=\"p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]\">
                <div>
                  <h3 className=\"text-2xl font-bold\">Active Appointments</h3>
                  <p className=\"text-gray-500 text-sm mt-1\">Manage incoming client requests.</p>
                </div>
              </div>
              <table className=\"w-full text-left\">
                <thead>
                  <tr className=\"text-gray-500 text-sm uppercase tracking-wider\">
                    <th className=\"px-8 py-5 font-semibold\">Client Info</th>
                    <th className=\"px-8 py-5 font-semibold\">Service Details</th>
                    <th className=\"px-8 py-5 font-semibold\">Payment Status</th>
                    <th className=\"px-8 py-5 font-semibold\">Status Control</th>
                    <th className=\"px-8 py-5 text-right font-semibold\">Actions</th>
                  </tr>
                </thead>
                <tbody className=\"divide-y divide-white/5\">
                  {bookings.map((b) => (
                    <tr key={b.id} className=\"hover:bg-white/[0.02] transition-all\">
                      <td className=\"px-8 py-6\">
                        <div className=\"text-lg font-bold text-white\">{b.name}</div>
                        <div className=\"flex flex-col gap-1 mt-1 text-sm text-gray-400\">
                          <span className=\"flex items-center gap-2\"><FiMail size={12}/> {b.email}</span>
                          <span className=\"flex items-center gap-2\"><FiPhone size={12}/> {b.phone}</span>
                        </div>
                      </td>
                      <td className=\"px-8 py-6\">
                        <div className=\"bg-blue-600/10 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold inline-block mb-1\">
                          {b.service}
                        </div>
                        <div className=\"text-gray-500 text-xs\">{b.date}</div>
                      </td>
                      <td className=\"px-8 py-6\">
                        {b.paymentId ? (
                          <div className=\"flex flex-col gap-1\">
                            <span className=\"text-emerald-400 font-bold text-xs flex items-center gap-1\">
                              <FiCreditCard size={12}/> PAID
                            </span>
                            <span className=\"text-[10px] text-gray-600 font-mono select-all\">ID: {b.paymentId}</span>
                          </div>
                        ) : (
                          <span className=\"text-gray-600 text-xs italic\">Pending Payment</span>
                        )}
                      </td>
                      <td className=\"px-8 py-6\">
                        <select 
                          value={b.status}
                          onChange={(e) => handleStatusUpdate(b.id, e.target.value)}
                          className=\"bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500 transition-all\"
                        >
                          <option value=\"pending\" className=\"bg-[#111]\">Pending</option>
                          <option value=\"confirmed\" className=\"bg-[#111]\">Confirmed</option>
                          <option value=\"completed\" className=\"bg-[#111]\">Completed</option>
                        </select>
                      </td>
                      <td className=\"px-8 py-6 text-right\">
                        <button 
                          onClick={() => handleDelete(b.id)}
                          className=\"bg-red-500/10 hover:bg-red-500/20 p-3 rounded-xl text-red-400 transition-all\"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className=\"p-20 text-center text-gray-500\">No bookings found.</div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className=\"max-w-2xl bg-[#111] p-8 rounded-[32px] border border-white/5\">
              <h3 className=\"text-2xl font-bold mb-6\">Admin Settings</h3>
              <div className=\"space-y-4\">
                <p className=\"text-gray-400 text-sm\">Update your access key and profile details.</p>
                <button className=\"bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20\">
                  Save All Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
