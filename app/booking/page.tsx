'use client'
import { useState } from 'react'

const services = ['Web Development','Graphic Design','Digital Marketing','Mobile App Development','SEO Optimization','Content Writing']

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-12 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Booking Confirmed!</h2>
        <p className="text-slate-400 mb-2">Thank you <span className="text-indigo-400 font-semibold">{form.name}</span>!</p>
        <p className="text-slate-400 text-sm">I&apos;ll contact you at <span className="text-white">{form.email}</span> within 24 hours.</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen gradient-bg py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">Get Started</p>
          <h1 className="text-5xl font-black text-white mb-4">Book a <span className="gradient-text">Consultation</span></h1>
          <p className="text-slate-400 text-lg">Fill out the form and I&apos;ll get back to you within 24 hours. 100% free.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Panel */}
          <div className="space-y-6">
            {[{icon:'📞',title:'Quick Response',desc:'I respond within 24 hours to all inquiries'},{icon:'🎯',title:'Free Consultation',desc:'No charges for initial project discussion'},{icon:'🔒',title:'100% Secure',desc:'Your data is private and never shared'},{icon:'⭐',title:'5-Star Quality',desc:'Premium work with guaranteed satisfaction'}].map(item=>(
              <div key={item.title} className="glass rounded-2xl p-6 flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div><p className="text-white font-semibold">{item.title}</p><p className="text-slate-400 text-sm">{item.desc}</p></div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Full Name *</label>
                  <input required type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Service Required *</label>
                  <select required value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
                    <option value="">Select a service</option>
                    {services.map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Preferred Date</label>
                  <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Budget Range</label>
                  <select value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}>
                    <option value="">Select budget</option>
                    <option>Under ₹5,000</option>
                    <option>₹5,000 – ₹10,000</option>
                    <option>₹10,000 – ₹25,000</option>
                    <option>Above ₹25,000</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Project Details</label>
                <textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about your project, goals, timeline..."></textarea>
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Booking Request →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
