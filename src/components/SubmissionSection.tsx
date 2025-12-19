import { CheckCircle2, Download, FileText, AlertCircle } from 'lucide-react';

interface SubmissionSectionProps {
  onSubmitClick: () => void;
}

export function SubmissionSection({ onSubmitClick }: SubmissionSectionProps) {
  const guidelines = [
    {
      title: 'Formatting',
      items: [
        'Use the IEEE conference template (two-column format)',
        'Full papers: 8-10 pages including references',
        'Short papers: 4-6 pages including references',
        'Posters: 2 pages including references'
      ]
    },
    {
      title: 'Anonymization',
      items: [
        'Remove all author names and affiliations from the submission',
        'Avoid self-citations that reveal identity',
        'Anonymize acknowledgments and funding sources',
        'Remove identifying information from figures and tables'
      ]
    },
    {
      title: 'Submission Requirements',
      items: [
        'Papers must be in PDF format',
        'Maximum file size: 10 MB',
        'Submit via our online portal only',
        'English language only',
        'Original work not published or under review elsewhere'
      ]
    },
    {
      title: 'Supplementary Material',
      items: [
        'Optional supplementary materials (code, datasets, appendices)',
        'Must be anonymized',
        'Submit as a single ZIP file (max 50 MB)',
        'Reviewers are not required to view supplementary materials'
      ]
    }
  ];

  return (
    <section id="submission" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-5xl">
          <h2 className="text-gray-900 mb-4">
            Submission Guidelines
          </h2>
          <p className="text-gray-600 mb-12">
            Please carefully review the following guidelines before submitting your paper.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {guidelines.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-gray-700 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-gray-900 mb-2">Important Notice</h4>
                <p className="text-gray-700 text-sm mb-2">
                  All submissions must be original work that has not been published elsewhere and is not currently
                  under review at another conference or journal.
                </p>
                <p className="text-gray-700 text-sm">
                  Submissions that violate double-blind reviewing requirements or formatting guidelines will be
                  desk-rejected without review.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-lg">
            <h3 className="mb-4">
              Ready to Submit?
            </h3>
            <p className="text-blue-100 mb-6">
              Download the paper template and access the submission system
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/conference-template-a4.docx"
                className="bg-white hover:bg-blue-50 text-blue-900 px-6 py-3 rounded-md transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download IEEE Template
              </a>
              <button
                onClick={onSubmitClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                Submit Paper
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}