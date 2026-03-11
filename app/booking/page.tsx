'use client'
import { useState } from 'react'
import Script from 'next/script'

const services = [
  { name: 'Web Development', price: 15000 },
  { name: 'Graphic Design', price: 5000 },
  { name: 'Digital Marketing', price: 8000 },
  { name: 'Mobile App Development', price: 25000 },
  { name: 'SEO Optimization', price: 10000 },
  { name: 'Content Writing', price: 3000 }
]

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    const selectedService = services.find(s => s.name === form.service)
    const amount = selectedService ? selectedService.price : 500

    try {
      const res = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR' })
      })
      const data = await res.json()

      if (!data.orderId) throw new Error('Order creation failed')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Karun Portfolio',
        description: `Booking for ${form.service}`,
        order_id: data.orderId,
        handler: async function (response: any) {
          await saveBooking(response.razorpay_payment_id)
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: '#6366f1' },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err) {
      setError('Payment initiation failed. Please try again.')
      setLoading(false)
    }
  }

  const saveBooking = async (paymentId?: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, paymentId })
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Booking save failed after payment. Please contact support.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await handlePayment()
  }

  if (submitted) return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-6">
      <div className="glass rounded-3xl p-12 text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-3">Booking Confirmed!</h2>
        <p className="text-slate-400 mb-2">Thank you <span className="text-indigo-400 font-semibold">{form.name}</span>!</p>
        <p className="text-slate-400 text-sm">I'll contact you at <span className="text-white">{form.email}</span> within 24 hours.</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen gradient-bg py-24 px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-semibold uppercase tracking-widest text-sm mb-3">Get Started</p>
          <h1 className="text-5xl font-black text-white mb-4">Book a <span className="gradient-text">Consultation</span></h1>
          <p className="text-slate-400 text-lg">Secure your slot with a small booking fee. Deductible from project total.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {[{icon:'📞',title:'Quick Response',desc:'I respond within 24 hours to all inquiries'},{icon:'🎯',title:'Expert Guidance',desc:'Get professional advice for your project'},{icon:'🔒',title:'Secure Payment',desc:'Transactions via Razorpay secure gateway'},{icon:'⭐',title:'5-Star Quality',desc:'Premium work with guaranteed satisfaction'}].map(item=>(
              <div key={item.title} className="glass rounded-2xl p-6 flex gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div><p className="text-white font-semibold">{item.title}</p><p className="text-slate-400 text-sm">{item.desc}</p></div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Full Name *</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Email Address *</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Service Required *</label>
                  <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition appearance-none" value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
                    <option value="" className="bg-slate-900">Select a service</option>
                    {services.map(s=><option key={s.name} value={s.name} className="bg-slate-900">{s.name} (₹{s.price.toLocaleString()})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Preferred Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">Project Details</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell me about your project, goals, timeline..."></textarea>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Processing...' : 'Pay & Book Consultation →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
