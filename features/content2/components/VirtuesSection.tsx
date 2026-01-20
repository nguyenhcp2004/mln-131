interface VirtuesData {
  id: number;
  title: string;
  content: string;
  virtues: {
    title: string;
    items: string[];
  };
  qualities: string[];
  quote: string;
}

interface VirtuesSectionProps {
  data: VirtuesData;
  servantQuotes: Array<{ text: string; author: string }>;
}

const VirtuesSection = ({ data, servantQuotes }: VirtuesSectionProps) => {
  return (
    <div className="mb-12 space-y-8">
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40 animate-slideUp">
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center border-2 border-amber-500">
            <span className="text-white font-bold text-xl">{data.id}</span>
          </div>
          <h3 className="text-2xl font-bold text-amber-100 mt-2">{data.title}</h3>
        </div>

        <p className="text-amber-100/90 text-lg leading-relaxed mb-8 ml-16">
          {data.content}
        </p>

        {/* Bốn đức */}
        <div className="ml-16 mb-8">
          <h4 className="text-xl font-bold text-amber-100 mb-4">{data.virtues.title}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.virtues.items.map((virtue, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 border-2 border-amber-500 text-center transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="text-white font-bold text-2xl">{virtue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phẩm chất */}
        <div className="ml-16 mb-8">
          <h4 className="text-xl font-bold text-amber-100 mb-4">Phẩm chất của đảng viên</h4>
          <div className="space-y-3">
            {data.qualities.map((quality, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-amber-900/20 rounded-lg p-4 border border-amber-700/30 hover:border-amber-600/50 transition-all"
              >
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-amber-100/90 text-lg">{quality}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="ml-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 border-2 border-amber-500">
          <div className="text-center">
            <svg className="w-8 h-8 text-white mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-white text-xl font-bold italic leading-relaxed">
              {data.quote}
            </p>
          </div>
        </div>
      </div>

      {/* Đảng là đầy tớ của nhân dân */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40 animate-slideUp">
        <h3 className="text-2xl font-bold text-amber-100 mb-6 text-center">
          Đảng là đầy tớ trung thành của nhân dân
        </h3>
        <div className="space-y-6">
          {servantQuotes.map((item, idx) => (
            <div
              key={idx}
              className="bg-amber-900/20 rounded-xl p-6 border border-amber-700/30"
            >
              <div className="flex gap-3 mb-3">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-amber-100/90 text-lg leading-relaxed italic">
                  "{item.text}"
                </p>
              </div>
              <p className="text-amber-500 text-right font-semibold">— {item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtuesSection;
