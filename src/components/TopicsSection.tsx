export function TopicsSection() {
  const topics = [
    {
      category: 'Machine Learning & Deep Learning',
      items: [
        'Supervised and unsupervised learning',
        'Deep neural networks and architectures',
        'Reinforcement learning and multi-agent systems',
        'Transfer learning and few-shot learning',
        'Generative models (GANs, VAEs, Diffusion models)',
        'Graph neural networks'
      ]
    },
    {
      category: 'Natural Language Processing',
      items: [
        'Large language models and transformers',
        'Machine translation and multilingual NLP',
        'Text generation and summarization',
        'Sentiment analysis and emotion recognition',
        'Question answering and conversational AI',
        'Information extraction and text mining'
      ]
    },
    {
      category: 'Computer Vision & Image Processing',
      items: [
        'Object detection and recognition',
        'Image segmentation and generation',
        'Video analysis and action recognition',
        '3D vision and scene understanding',
        'Medical image analysis',
        'Visual question answering'
      ]
    },
    {
      category: 'AI for Social Good & Applications',
      items: [
        'Healthcare and medical diagnosis AI',
        'Agricultural AI and precision farming',
        'Educational technology and intelligent tutoring',
        'Environmental monitoring and climate AI',
        'Smart cities and urban computing',
        'Disaster response and humanitarian AI'
      ]
    },
    {
      category: 'Trustworthy & Responsible AI',
      items: [
        'AI ethics and fairness',
        'Explainable and interpretable AI',
        'Privacy-preserving machine learning',
        'Robustness and adversarial learning',
        'AI safety and alignment',
        'Bias detection and mitigation'
      ]
    },
    {
      category: 'Emerging AI Topics',
      items: [
        'Quantum machine learning',
        'Neuromorphic computing',
        'AI on edge devices and IoT',
        'Federated and distributed learning',
        'AutoML and neural architecture search',
        'AI-assisted scientific discovery'
      ]
    }
  ];

  return (
    <section id="topics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">
              Topics of Interest
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We welcome submissions on all aspects of artificial intelligence. The following list provides 
              guidance on topics of particular interest, though submissions are not limited to these areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-4 pb-3 border-b border-gray-300">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                  <h3 className="text-gray-900 flex-1">
                    {topic.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {topic.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-blue-600 mt-0.5">▸</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div>
                <h4 className="mb-2">Beyond These Topics?</h4>
                <p className="text-blue-50 text-sm mb-3">
                  This list is not exhaustive. We encourage submissions on emerging areas, interdisciplinary topics, 
                  and novel applications of AI.
                </p>
                <p className="text-blue-50 text-sm">
                  <strong>Any paper that involves AI or is related to AI technologies will also be accepted.</strong> 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}