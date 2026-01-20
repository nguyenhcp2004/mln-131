interface Characteristic {
  id: number;
  title: string;
  content: string;
}

interface CivilizedPartySectionProps {
  title: string;
  description: string;
  characteristics: Characteristic[];
}

const CivilizedPartySection = ({ title, description, characteristics }: CivilizedPartySectionProps) => {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-amber-100 mb-4">{title}</h2>
        <p className="text-amber-200/80 text-lg leading-relaxed max-w-4xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {characteristics.map((char, index) => (
          <div
            key={char.id}
            className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/40 hover:border-amber-600/60 transition-all duration-300 animate-slideUp hover:transform hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center border-2 border-amber-500">
                <span className="text-white font-bold">{char.id}</span>
              </div>
              <h3 className="text-xl font-bold text-amber-100 mt-1">{char.title}</h3>
            </div>
            <p className="text-amber-100/90 leading-relaxed ml-14">
              {char.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CivilizedPartySection;
