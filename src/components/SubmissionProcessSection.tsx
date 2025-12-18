import { FileText, Upload, PenTool } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: PenTool,
    title: 'Prepare',
    description: 'Write your paper following IEEE format and anonymization guidelines',
    color: 'bg-blue-500'
  },
  {
    number: 2,
    icon: FileText,
    title: 'Details',
    description: 'Fill in paper information, abstract, keywords, and author details',
    color: 'bg-cyan-500'
  },
  {
    number: 3,
    icon: Upload,
    title: 'Upload',
    description: 'Submit your manuscript and supplementary materials via our portal',
    color: 'bg-indigo-500'
  }
];

interface SubmissionProcessSectionProps {
  onSubmitClick: () => void;
}

export function SubmissionProcessSection({ onSubmitClick }: SubmissionProcessSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">
            Submission Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to submit your research paper to NCAI 2026
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 to-green-200" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div className={`w-32 h-32 ${step.color} rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10 transform transition-transform hover:scale-110`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-sm text-gray-700 shadow-md z-20">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onSubmitClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
          >
            Start Your Submission
          </button>
        </div>
      </div>
    </section>
  );
}