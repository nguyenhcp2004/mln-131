interface Section {
  id: number;
  title: string;
  content: string;
  highlights?: string[];
  keyPoints?: string[];
}

interface PurposeSectionProps {
  sections: Section[];
}

const PurposeSection = ({ sections }: PurposeSectionProps) => {
  return (
    <div className="mb-12 space-y-8">
      <h2 className="text-3xl font-bold text-amber-100 text-center mb-8">
        Đạo đức của Đảng
      </h2>

      {sections.slice(0, 2).map((section, index) => (
        <div
          key={section.id}
          className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40 hover:border-amber-600/60 transition-all duration-300 animate-slideUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center border-2 border-amber-500">
              <span className="text-white font-bold text-xl">{section.id}</span>
            </div>
            <h3 className="text-2xl font-bold text-amber-100 mt-2">{section.title}</h3>
          </div>

          <p className="text-amber-100/90 text-lg leading-relaxed mb-6 ml-16">
            {section.content}
          </p>

          {section.highlights && (
            <div className="ml-16 grid grid-cols-1 md:grid-cols-2 gap-3">
              {section.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-amber-900/20 rounded-lg p-3 border border-amber-700/30"
                >
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-amber-100/90">{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {section.keyPoints && (
            <div className="ml-16 space-y-2">
              {section.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-amber-900/20 rounded-lg p-3 border border-amber-700/30"
                >
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-amber-100/90">{point}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PurposeSection;
