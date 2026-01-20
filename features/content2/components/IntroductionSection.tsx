interface IntroductionProps {
  quote: string;
  author: string;
  context: string;
  description: string;
}

const IntroductionSection = ({ quote, author, context, description }: IntroductionProps) => {
  return (
    <div className="mb-12 animate-slideUp">
      <div className="rounded-2xl p-8 border-2 border-amber-700/40 bg-black/20 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-block">
            <svg className="w-12 h-12 text-amber-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="text-3xl md:text-4xl font-bold text-amber-100 mb-4 italic">
            "{quote}"
          </blockquote>
          <p className="text-amber-200/90 text-lg mb-2">— {author}</p>
          <p className="text-amber-200/70 text-sm italic">{context}</p>
        </div>
        <div className="mt-6 pt-6 border-t border-amber-700/30">
          <p className="text-amber-100/90 text-lg leading-relaxed text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;
