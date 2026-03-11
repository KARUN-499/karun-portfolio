import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-gray-900 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Karun Rathee</h1>
        <p className="text-xl text-blue-300 mb-2">Web Developer | Graphic Designer | Digital Marketer</p>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Delivering high-quality digital solutions to help your business grow online.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/booking" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">Book a Consultation</Link>
          <Link href="/portfolio" className="border border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold">View Portfolio</Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">My Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Web Development', price: '₹5,000', desc: 'Custom websites built with modern technologies' },
              { title: 'Graphic Design', price: '₹2,000', desc: 'Eye-catching logos, banners, and brand identities' },
              { title: 'Digital Marketing', price: '₹3,000', desc: 'SEO, social media, and online advertising' },
              { title: 'Mobile App Development', price: '₹15,000', desc: 'Cross-platform mobile applications' },
              { title: 'SEO Optimization', price: '₹2,500', desc: 'Rank higher on Google with proven strategies' },
              { title: 'Content Writing', price: '₹1,500', desc: 'Engaging content for your website and social media' },
            ].map((s) => (
              <div key={s.title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-blue-600 font-semibold mb-2">Starting at {s.price}</p>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul Sharma', review: 'Karun delivered an amazing website for my business. Highly professional!', rating: 5 },
              { name: 'Priya Singh', review: 'The graphic design work was outstanding. Exceeded my expectations.', rating: 5 },
              { name: 'Amit Kumar', review: 'Great digital marketing results. My sales increased by 40%!', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 p-6 rounded-xl">
                <p className="text-yellow-500 text-lg mb-2">{"★".repeat(t.rating)}</p>
                <p className="text-gray-700 mb-4 italic">&ldquo;{t.review}&rdquo;</p>
                <p className="font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="mb-8">Let&apos;s work together to bring your vision to life.</p>
        <Link href="/booking" className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100">Book Now</Link>
      </section>
    </main>
  )
}
