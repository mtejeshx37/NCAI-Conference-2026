import { Mail, Phone, MapPin, MessageSquare, Send, User } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/mail/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const organizingTeam = [
    {
      name: 'Charan Selva Dhanush',
      role: 'Organizing Committee',
      phone: '+91 99625 24758'
    },
    {
      name: 'Ramapriya',
      role: 'Organizing Committee',
      phone: '+91 91506 22416'
    },
    {
      name: 'Varshha',
      role: 'Organizing Committee',
      phone: '+91 89397 77852'
    },
    {
      name: 'Shivashiga',
      role: 'Organizing Committee',
      phone: '+91 86103 19909'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about NCAI 2026? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-gray-900 mb-6">Send us a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-gray-700 text-sm block mb-2">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm block mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.doe@university.edu"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm block mb-2">Subject</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Submission inquiry"
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 text-sm block mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message here..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* General Contact */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 mb-4">General Inquiries</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {/* <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" /> */}
                  <div>
                    <p className="text-gray-700 text-sm mb-1">Email</p>
                    <a href="mailto:magnus@citchennai.net" className="text-blue-600 hover:underline">
                      magnus@citchennai.net
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 text-sm mb-1">Phone</p>
                    <p className="text-gray-900">+91 99625 24758</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 text-sm mb-1">Address</p>
                    <p className="text-gray-900">
                      Chennai Institute of Technology<br />
                      Kundrathur, Sarathy Nagar<br />
                      Chennai - 600069, Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizing Team */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-gray-900 mb-4">Organizing Committee</h3>
              <p className="text-gray-600 text-sm mb-4">
                For specific inquiries, reach out directly to our organizing team members:
              </p>
              <div className="space-y-4">
                {organizingTeam.map((member, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-900 mb-1">{member.name}</p>
                    <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl">
              <h4 className="mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="#submission" className="block text-blue-100 hover:text-white transition-colors text-sm">
                  → Submission Guidelines
                </a>
                <a href="#dates" className="block text-blue-100 hover:text-white transition-colors text-sm">
                  → Important Dates
                </a>
                <a href="#venue" className="block text-blue-100 hover:text-white transition-colors text-sm">
                  → Venue Information
                </a>
                <a href="#committee" className="block text-blue-100 hover:text-white transition-colors text-sm">
                  → Full Committee List
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}