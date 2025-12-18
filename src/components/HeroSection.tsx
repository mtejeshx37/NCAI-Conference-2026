import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSubmitClick: () => void;
}

export function HeroSection({ onSubmitClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/50" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-5 py-2.5 rounded-full text-sm mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4" />
            <span>National Conference • February 02th , 2026 • Chennai, India</span>
          </div>

          <h1 className="text-gray-900 mb-4 text-5xl lg:text-6xl bg-clip-text">
            National Conference on Artificial Intelligence
          </h1>

          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-blue-600 text-4xl">
              NCAI 2026
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full" />
          </div>

          <p className="text-gray-600 mb-8 text-xl max-w-3xl leading-relaxed">
            Organized by Chennai Institute of Technology, NCAI 2026 invites original research contributions
            addressing theoretical, experimental, and applied aspects of artificial intelligence and machine learning.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={onSubmitClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3.5 rounded-lg transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
            >
              Submit Your Paper
            </button>
          </div>

          {/* Key Highlights */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-gray-900 mb-2">Peer-Reviewed</h3>
              <p className="text-gray-600 text-sm">Double-blind review process by expert researchers</p>
            </div>
            <div className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-gray-900 mb-2">Publication</h3>
              <p className="text-gray-600 text-sm">Indexed proceedings in major databases</p>
            </div>
            <div className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="text-gray-900 mb-2">Best Paper Awards</h3>
              <p className="text-gray-600 text-sm">Recognition for outstanding contributions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}