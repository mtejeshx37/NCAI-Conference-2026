import { MapPin, Building2 } from 'lucide-react';

export function VenueSection() {
  return (
    <section id="venue" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-gray-900 mb-4">
            Conference Venue
          </h2>
          <p className="text-gray-600">
            Join us at Chennai Institute of Technology's state-of-the-art campus
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Google Map */}
          <div className="space-y-6">
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.258447654962!2d80.09064431482153!3d12.96598199087339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f5ee8a1c3e5%3A0x2b1e3b6d8e6e5c0a!2sChennai%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chennai Institute of Technology Location"
              />
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
              <h4 className="mb-3">Navigate to Campus</h4>
              <p className="text-blue-50 text-sm mb-4">
                Click the button below to get directions from your current location
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Chennai+Institute+of+Technology+Kundrathur+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-gray-900 mb-6">About the Venue</h3>
              <p className="text-gray-700 mb-6">
                Chennai Institute of Technology is a premier educational institution located in the southern part of Chennai.
                The campus features modern conference facilities, advanced research labs, and excellent accommodation options
                for attendees.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <MapPin className="w-6 h-6 text-blue-600 mb-3" />
                <h4 className="text-gray-900 mb-2">Address</h4>
                <p className="text-gray-600 text-sm">
                  Kundrathur, Sarathy Nagar<br />
                  Chennai - 600069<br />
                  Tamil Nadu, India
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <Building2 className="w-6 h-6 text-blue-600 mb-3" />
                <h4 className="text-gray-900 mb-2">Campus</h4>
                <p className="text-gray-600 text-sm">
                  50-acre campus with<br />
                  modern facilities and<br />
                  green environment
                </p>
              </div>
            </div>

            {/* Getting There */}
            <div className="bg-gray-900 text-white p-6 rounded-xl">
              <h4 className="mb-3">Getting There</h4>
              <p className="text-gray-300 text-sm mb-4">
                Located 25 km from Chennai International Airport and well-connected by public transport.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-gray-300 text-sm">Direct bus services from Chennai Central</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-gray-300 text-sm">Taxi and ride-sharing services available</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <p className="text-gray-300 text-sm">Parking facilities available on campus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}