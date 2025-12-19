import { FileText, Users, Award } from 'lucide-react';

export function CallForPapersSection() {
  return (
    <section id="cfp" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">
          <h2 className="text-gray-900 mb-6">
            Call for Papers
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              NCAI 2026 invites submissions of original research and applications in all areas of Artificial Intelligence. 
              We welcome both theoretical and applied work, including but not limited to machine learning, natural language 
              processing, computer vision, robotics, and AI ethics.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 not-prose">
              <div className="bg-blue-50 p-6 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-gray-900 mb-2">Full Papers</h3>
                <p className="text-gray-600 text-sm mb-2">8-10 pages</p>
                <p className="text-gray-600 text-sm">
                  Original research contributions with substantial experimental validation
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <FileText className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-gray-900 mb-2">Short Papers</h3>
                <p className="text-gray-600 text-sm mb-2">4-6 pages</p>
                <p className="text-gray-600 text-sm">
                  Work in progress, novel ideas, or focused contributions
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="text-gray-900 mb-2">Posters</h3>
                <p className="text-gray-600 text-sm mb-2">2 pages</p>
                <p className="text-gray-600 text-sm">
                  Demonstrations, preliminary results, or position papers
                </p>
              </div>
            </div>

            <h3 className="text-gray-900 mb-4">Review Process</h3>
            <p className="text-gray-700 mb-6">
              All submissions will undergo a rigorous <strong>double-blind peer review</strong> process. Each paper will 
              be reviewed by at least three members of the program committee. Authors must ensure their submissions are 
              anonymized and do not include identifying information.
            </p>

            <h3 className="text-gray-900 mb-4">Publication & Presentation</h3>
            <p className="text-gray-700 mb-4">
              Accepted papers will be published in the conference proceedings and will be indexed in major databases. 
              At least one author of each accepted paper must register and present the work at the conference.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6 not-prose">
              <div className="flex gap-3">
                <Award className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-gray-900 mb-2">Best Paper Awards</h4>
                  <p className="text-gray-700 text-sm">
                    Outstanding submissions will be selected for Best Paper, Best Student Paper, and 
                    Best Application Paper awards, with certificates and prizes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
