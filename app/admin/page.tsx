'use client'

import { useState, useEffect } from 'react'
import { 
  FiGrid, FiPackage, FiBriefcase, FiCalendar, FiSettings, 
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiUsers,
  FiTrendingUp, FiMail, FiPhone, FiGlobe, FiLock
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
}

type Service = {
  id: string
  title: string
  price: string
  description: string
  icon: string
}

type Project = {
  id: string
  title: string
  category: string
  tech: string[]
  image: string
}

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', service: 'Full Stack App', date: '2024-05-20', status: 'pending' },
    { id: '2', name: 'Sarah Khan', email: 'sarah@example.com', phone: '+91 8888888888', service: 'UI/UX Design', date: '2024-05-22', status: 'confirmed' },
  ])

  const [services, setServices] = useState<Service[]>([
    { id: '1', title: 'Web App Development', price: '₹25,000+', description: 'Complete full-stack web applications.', icon: 'FiGlobe' },
    { id: '2', title: 'UI/UX Design', price: '₹10,000+', description: 'Modern, Gemini-inspired designs.', icon: 'FiGrid' },
  ])

  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'E-commerce Platform', category: 'Web App', tech: ['Next.js', 'Tailwind'], image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500' },
  ])

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
      <div className=\"min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6\">
        <div className=\"max-w-md w-full\">
          <div className=\"bg-[#111] p-8 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group\">
            <div className=\"absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700\"></div>
            <div className=\"relative z-10\">
              <div className=\"w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6\">
                <FiLock className=\"text-blue-400 text-2xl\" />
              </div>
              <h1 className=\"text-3xl font-bold text-white mb-2 tracking-tight\">Admin Panel</h1>
              <p className=\"text-gray-400 mb-8\">Enter your access key to manage your portfolio.</p>
              
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
      {/* Sidebar */}
      <aside className=\"w-72 bg-[#111] border-r border-white/5 flex flex-col p-6 fixed h-full z-50\">
        <div className=\"flex items-center gap-3 mb-12 px-2\">
          <div className=\"w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl\">K</div>
          <span className=\"font-bold text-xl tracking-tight\">Karun<span className=\"text-blue-500\">.</span>Admin</span>
        </div>

        <nav className=\"flex-1 space-y-2\">
          {[
            { id: 'dashboard', icon: FiGrid, label: 'Dashboard' },
            { id: 'services', icon: FiPackage, label: 'Services' },
            { id: 'portfolio', icon: FiBriefcase, label: 'Portfolio' },
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

      {/* Main Content */}
      <main className=\"flex-1 ml-72 p-10\">
        {/* Top Header */}
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
            <div className=\"w-10 h-10 bg-[#222] border border-white/5 rounded-full flex items-center justify-center\">
              <img src=\"https://ui-avatars.com/api/?name=Karun+Rathee&background=0D8ABC&color=fff\" alt=\"\" className=\"w-full h-full rounded-full\" />
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <div className=\"animate-in fade-in slide-in-from-bottom-4 duration-500\">
          {activeTab === 'dashboard' && (
            <div className=\"space-y-8\">
              {/* Stats Grid */}
              <div className=\"grid grid-cols-4 gap-6\">
                {[
                  { label: 'Total Bookings', value: bookings.length, icon: FiCalendar, color: 'text-blue-400' },
                  { label: 'Services', value: services.length, icon: FiPackage, color: 'text-purple-400' },
                  { label: 'Portfolio', value: projects.length, icon: FiBriefcase, color: 'text-emerald-400' },
                  { label: 'Growth', value: '+12%', icon: FiTrendingUp, color: 'text-orange-400' },
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

              {/* Recent Activity / Bookings Table */}
              <div className=\"bg-[#111] rounded-[32px] border border-white/5 overflow-hidden\">
                <div className=\"p-6 border-b border-white/5 flex justify-between items-center\">
                  <h3 className=\"text-xl font-bold\">Recent Bookings</h3>
                  <button onClick={() => setActiveTab('bookings')} className=\"text-blue-400 text-sm hover:underline\">View All</button>
                </div>
                <table className=\"w-full text-left\">
                  <thead>
                    <tr className=\"text-gray-500 text-sm\">
                      <th className=\"px-6 py-4 font-medium\">Client</th>
                      <th className=\"px-6 py-4 font-medium\">Service</th>
                      <th className=\"px-6 py-4 font-medium\">Date</th>
                      <th className=\"px-6 py-4 font-medium\">Status</th>
                    </tr>
                  </thead>
                  <tbody className=\"divide-y divide-white/5\">
                    {bookings.slice(0, 3).map((b) => (
                      <tr key={b.id} className=\"hover:bg-white/[0.02] transition-all\">
                        <td className=\"px-6 py-5\">
                          <div className=\"font-medium\">{b.name}</div>
                          <div className=\"text-xs text-gray-500\">{b.email}</div>
                        </td>
                        <td className=\"px-6 py-5 text-gray-300\">{b.service}</td>
                        <td className=\"px-6 py-5 text-gray-400\">{b.date}</td>
                        <td className=\"px-6 py-5\">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
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

          {activeTab === 'services' && (
            <div className=\"space-y-6\">
              <div className=\"flex justify-between items-center\">
                <h3 className=\"text-xl font-bold\">Service Catalog</h3>
                <button className=\"bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all\">
                  <FiPlus /> Add New Service
                </button>
              </div>
              <div className=\"grid grid-cols-2 gap-6\">
                {services.map((s) => (
                  <div key={s.id} className=\"bg-[#111] p-6 rounded-[24px] border border-white/5 flex gap-6 hover:border-blue-500/30 transition-all group\">
                    <div className=\"w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center shrink-0\">
                      <FiPackage className=\"text-blue-400 text-3xl\" />
                    </div>
                    <div className=\"flex-1\">
                      <div className=\"flex justify-between\">
                        <h4 className=\"font-bold text-lg\">{s.title}</h4>
                        <div className=\"flex gap-2 opacity-0 group-hover:opacity-100 transition-all\">
                          <button className=\"p-2 hover:bg-white/10 rounded-lg text-gray-400\"><FiEdit2 /></button>
                          <button className=\"p-2 hover:bg-red-500/10 rounded-lg text-red-400\"><FiTrash2 /></button>
                        </div>
                      </div>
                      <div className=\"text-blue-400 font-bold mb-2\">{s.price}</div>
                      <p className=\"text-gray-500 text-sm leading-relaxed\">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className=\"space-y-6\">
              <div className=\"flex justify-between items-center\">
                <h3 className=\"text-xl font-bold\">Work Portfolio</h3>
                <button className=\"bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all\">
                  <FiPlus /> New Project
                </button>
              </div>
              <div className=\"grid grid-cols-3 gap-6\">
                {projects.map((p) => (
                  <div key={p.id} className=\"bg-[#111] rounded-[24px] border border-white/5 overflow-hidden group\">
                    <div className=\"h-48 bg-[#222] relative\">
                      <img src={p.image} alt=\"\" className=\"w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700\" />
                      <div className=\"absolute inset-0 bg-gradient-to-t from-[#111] to-transparent\"></div>
                    </div>
                    <div className=\"p-6\">
                      <span className=\"text-xs text-purple-400 font-bold uppercase tracking-wider\">{p.category}</span>
                      <h4 className=\"text-white font-bold text-lg mt-1\">{p.title}</h4>
                      <div className=\"flex gap-2 mt-4\">
                        {p.tech.map(t => <span key={t} className=\"text-[10px] bg-white/5 px-2.5 py-1.5 rounded-lg text-gray-400 font-medium\">{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
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
                <div className=\"flex gap-2\">
                   <span className=\"bg-blue-600/10 text-blue-400 px-4 py-2 rounded-xl text-sm font-bold\">{bookings.length} Total</span>
                </div>
              </div>
              <table className=\"w-full text-left\">
                <thead>
                  <tr className=\"text-gray-500 text-sm uppercase tracking-wider\">
                    <th className=\"px-8 py-5 font-semibold\">Client Info</th>
                    <th className=\"px-8 py-5 font-semibold\">Service Details</th>
                    <th className=\"px-8 py-5 font-semibold\">Scheduled Date</th>
                    <th className=\"px-8 py-5 font-semibold text-right\">Actions</th>
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
                        <div className=\"text-gray-500 text-xs\">Initial Inquiry</div>
                      </td>
                      <td className=\"px-8 py-6\">
                        <div className=\"text-gray-300\">{b.date}</div>
                        <div className=\"text-emerald-500 text-xs mt-1\">Available</div>
                      </td>
                      <td className=\"px-8 py-6 text-right\">
                        <button className=\"bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all mr-2\">
                          <FiEdit2 size={16} />
                        </button>
                        <button className=\"bg-red-500/10 hover:bg-red-500/20 p-3 rounded-xl text-red-400 transition-all\">
                          <FiTrash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className=\"max-w-4xl space-y-8\">
              <div className=\"bg-[#111] p-8 rounded-[32px] border border-white/5\">
                <h3 className=\"text-2xl font-bold mb-8\">Personal Information</h3>
                <div className=\"grid grid-cols-2 gap-8\">
                  <div className=\"space-y-3\">
                    <label className=\"text-sm font-medium text-gray-400 ml-1\">Public Name</label>
                    <input type=\"text\" defaultValue=\"Karun Rathee\" className=\"w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all\" />
                  </div>
                  <div className=\"space-y-3\">
                    <label className=\"text-sm font-medium text-gray-400 ml-1\">Contact Email</label>
                    <input type=\"email\" defaultValue=\"karunsingh5228@gmail.com\" className=\"w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all\" />
                  </div>
                  <div className=\"col-span-2 space-y-3\">
                    <label className=\"text-sm font-medium text-gray-400 ml-1\">Bio / Hero Headline</label>
                    <textarea rows={4} className=\"w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all resize-none\">I craft exceptional digital experiences that drive real business results.</textarea>
                  </div>
                </div>
                <button className=\"mt-10 bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all\">
                  Save All Changes
                </button>
              </div>

              <div className=\"bg-red-500/5 p-8 rounded-[32px] border border-red-500/10\">
                <h3 className=\"text-xl font-bold text-red-400 mb-2\">Security</h3>
                <p className=\"text-gray-500 text-sm mb-6\">Change your admin access credentials.</p>
                <div className=\"max-w-xs space-y-4\">
                  <input type=\"password\" placeholder=\"New Access Key\" className=\"w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none transition-all\" />
                  <button className=\"bg-red-500/20 text-red-400 px-6 py-3 rounded-xl text-sm font-bold\">Update Security</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
