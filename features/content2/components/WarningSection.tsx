interface WarningSectionProps {
  title: string;
  quote: string;
  author: string;
  message: string;
}

const WarningSection = ({ title, quote, author, message }: WarningSectionProps) => {
  return (
    <div className="mb-12 animate-slideUp">
      <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 rounded-2xl p-8 border-2 border-amber-600/50 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-amber-100 mb-6">{title}</h2>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 mb-6 border border-amber-700/30">
          <div className="flex gap-3 mb-4">
            <svg className="w-8 h-8 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-amber-100 text-xl leading-relaxed italic">
              "{quote}"
            </blockquote>
          </div>
          <p className="text-amber-500 text-right font-bold text-lg">— {author}</p>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30">
          <p className="text-amber-100/90 text-lg leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WarningSection;
