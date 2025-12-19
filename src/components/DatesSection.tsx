import { Calendar, AlertCircle } from 'lucide-react';

const dates = [
  {
    label: 'Paper Submission Deadline',
    date: 'March 15, 2026',
    time: '23:59 AOE',
    highlight: true
  },
  {
    label: 'Conference Dates',
    date: 'February 2nd 2026',
    time: '',
    highlight: true
  }
];

export function DatesSection() {
  return (
    <section id="dates" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gray-900 mb-4">
            <strong>Important Dates</strong>
          </h2>
          {/* <p className="text-gray-600 mb-8">
            All deadlines are at 23:59 Anywhere on Earth (AOE) unless otherwise specified.
          </p> */}

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 text-sm">
                <strong>Note:</strong> All deadlines are firm. No extensions will be granted. Plan your submission accordingly.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {dates.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-l-4 ${item.highlight
                  ? 'bg-blue-50 border-blue-600'
                  : 'bg-white border-gray-300'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.highlight ? 'bg-blue-600' : 'bg-gray-200'
                    }`}>
                    <Calendar className={`w-6 h-6 ${item.highlight ? 'text-white' : 'text-gray-600'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-1 ${item.highlight ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                      {item.label}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`${item.highlight ? 'text-blue-800' : 'text-gray-700'
                        }`}>
                        {item.date}
                      </p>
                      {item.time && (
                        <>
                          <span className="text-gray-400">•</span>
                          <p className="text-gray-600 text-sm">
                            {item.time}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-blue-600 hover:text-blue-700 underline">
              Add to Google Calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
