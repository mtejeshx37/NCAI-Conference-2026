import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
const logo = "/logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <img src={logo} alt="CIT Logo" className="h-12 mb-4 bg-white p-1 rounded" />
            <h3 className="mb-4">NCAI 2026</h3>
            <p className="text-gray-400 text-sm mb-4">
              National Conference on Artificial Intelligence, organized by Chennai Institute of Technology.
              Join us for cutting-edge research presentations and networking opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#cfp" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Call for Papers
                </a>
              </li>
              <li>
                <a href="#submission" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Submission Guidelines
                </a>
              </li>
              <li>
                <a href="#dates" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Important Dates
                </a>
              </li>
              <li>
                <a href="#venue" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Venue
                </a>
              </li>
              <li>
                <a href="#committee" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Committee
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  Kundrathur, Chennai<br />
                  Tamil Nadu 600069, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-400 text-sm">+91 44 2247 1113</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-400 text-sm">ncai2026@citchennai.net</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Chennai Institute of Technology. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/citchennai_official/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/school/chennai-institute-of-technology/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}