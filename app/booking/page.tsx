'use client'
import { useState } from 'react'

export default function BookingPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }
  if (submitted) return (<div className="min-h-screen flex items-center justify-center"><div className="bg-white p-10 rounded-xl shadow text-center"><h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2><p className="text-gray-600">Thank you {form.name}! I will contact you at {form.email} within 24 hours.</p></div></div>)
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Book a Consultation</h1>
        <p className="text-center text-gray-600 mb-10">Fill out the form and I will get back to you within 24 hours.</p>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-6">
          <div><label className="block text-sm font-medium mb-2">Full Name *</label><input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" placeholder="Your name" /></div>
          <div><label className="block text-sm font-medium mb-2">Email *</label><input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" placeholder="your@email.com" /></div>
          <div><label className="block text-sm font-medium mb-2">Phone</label><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" placeholder="+91 xxxxx xxxxx" /></div>
          <div><label className="block text-sm font-medium mb-2">Service *</label><select required value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full border rounded-lg px-4 py-2"><option value="">Select a service</option><option>Web Development</option><option>Graphic Design</option><option>Digital Marketing</option><option>Mobile App Development</option><option>SEO Optimization</option><option>Content Writing</option></select></div>
          <div><label className="block text-sm font-medium mb-2">Preferred Date</label><input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full border rounded-lg px-4 py-2" /></div>
          <div><label className="block text-sm font-medium mb-2">Message</label><textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full border rounded-lg px-4 py-2" placeholder="Tell me about your project..."></textarea></div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Submit Booking Request</button>
        </form>
      </div>
    </main>
  )
}
