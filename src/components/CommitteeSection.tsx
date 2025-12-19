export function CommitteeSection() {
  const chairs = [
    {
      role: 'Organizing Committee',
      members: [
        { name: 'Charan Selva Dhanush', affiliation: 'Chennai Institute of Technology' },
        { name: 'Ramapriya', affiliation: 'Chennai Institute of Technology' },
        { name: 'Varshha', affiliation: 'Chennai Institute of Technology' },
        { name: 'Shivashiga', affiliation: 'Chennai Institute of Technology' }
      ]
    }
  ];

  return (
    <section id="committee" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-5xl">
          <h2 className="text-gray-900 mb-4">
            Organizing Committee
          </h2>
          <p className="text-gray-600 mb-12">
            Meet the dedicated team organizing NCAI 2026
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50/30 p-8 rounded-xl border border-blue-200">
              <h3 className="text-gray-900 mb-6 pb-3 border-b border-gray-300 text-center">
                Conference Organizers
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {chairs[0].members.map((member, memberIndex) => (
                  <div key={memberIndex} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-3 text-xl">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <p className="text-gray-900 mb-1">
                      {member.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.affiliation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-gray-900 mb-3">
              Program Committee
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Our program committee consists of leading researchers and practitioners from academia and industry 
              worldwide. The full list of PC members will be announced soon.
            </p>
            <button className="text-blue-600 hover:text-blue-700 text-sm">
              View Full Committee List →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}