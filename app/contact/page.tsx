'use client'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', service: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <main>
      <section style={{background:'#000', padding:'80px 0 60px'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="section-label mb-4">Get in Touch</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-tight">Let’s Work Together</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Have a project in mind? I’d love to hear about it.</p>
        </div>
      </section>
      <div className="divider"></div>
      <section style={{background:'#000', padding:'80px 0'}}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
              <div className="space-y-5">
                {[
                  { label: 'Email', value: 'karunsingh5228@gmail.com', icon: '📧' },
                  { label: 'Location', value: 'Samalkha, Panipat, HARYANA, India', icon: '📍' },
                  { label: 'Availability', value: '24/7', icon: '⏰' },
                  { label: 'Response', value: 'Within 24 hours', icon: '⚡' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl" style={{background:'#0d0d0d', border:'1px solid rgba(255,255,255,0.07)'}}>
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-slate-300 text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
              {status === 'success' ? (
                <div className="p-6 rounded-xl text-center" style={{background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.3)'}}>
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="text-white font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">I’ll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary mt-4 text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">Name</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} required>
                      <option value="">Select a service...</option>
                      {['Web Development','Graphic Design','Digital Marketing','Mobile Apps','SEO','Content Writing'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 block">Message</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} placeholder="Tell me about your project..." required style={{resize:'vertical'}} />
                  </div>
                  {status === 'error' && <p className="text-red-400 text-sm">⚠️ Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'loading'} className="btn-primary w-full">
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
