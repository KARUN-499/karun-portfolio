export default function ContactPage() {
  return (
    <main className="min-h-screen py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Me</h1>
        <p className="text-center text-gray-600 mb-12">Have a question or want to work together? I&apos;d love to hear from you.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-600">
                <p>📧 admin@yourdomain.com</p>
                <p>📱 +91 98765 43210</p>
                <p>📍 Adda Jhungian, Punjab, India</p>
                <p>⏰ Mon-Sat: 9AM - 7PM IST</p>
              </div>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2">Response Time</h3>
              <p className="text-blue-100">I typically respond within 24 hours. For urgent projects, mention it in your message.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <form className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Your name" /></div>
              <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" className="w-full border rounded-lg px-4 py-2" placeholder="your@email.com" /></div>
              <div><label className="block text-sm font-medium mb-1">Subject</label><input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="How can I help?" /></div>
              <div><label className="block text-sm font-medium mb-1">Message</label><textarea rows={4} className="w-full border rounded-lg px-4 py-2" placeholder="Your message..."></textarea></div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
