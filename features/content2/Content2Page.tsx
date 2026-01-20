import contentData from './data/content.json';
import IntroductionSection from './components/IntroductionSection';
import PurposeSection from './components/PurposeSection';
import VirtuesSection from './components/VirtuesSection';
import CivilizedPartySection from './components/CivilizedPartySection';
import WarningSection from './components/WarningSection';
import ConclusionSection from './components/ConclusionSection';
import ContentNavigation from '@/components/ContentNavigation';

const Content2Page = () => {
  // Type-safe data extraction
  const moralityPoints = contentData.moralityPoints;
  const purposeSections = moralityPoints.slice(0, 2);
  const virtuesData = moralityPoints[2];
  const servantQuotes = virtuesData.servantQuotes || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slideUp">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              {contentData.title}
            </h1>
            <p className="text-2xl md:text-3xl text-amber-200/80 italic">
              {contentData.subtitle}
            </p>
          </div>

          {/* Introduction */}
          <IntroductionSection
            quote={contentData.introduction.quote}
            author={contentData.introduction.author}
            context={contentData.introduction.context}
            description={contentData.introduction.description}
          />

          {/* Purpose & No Private Purpose */}
          <PurposeSection sections={purposeSections as any} />

          {/* Virtues & Servant of People */}
          <VirtuesSection
            data={virtuesData as any}
            servantQuotes={servantQuotes}
          />

          {/* Civilized Party - 6 characteristics (points 4-9) */}
          <CivilizedPartySection
            title={contentData.civilizedParty.title}
            description={contentData.civilizedParty.description}
            characteristics={contentData.civilizedParty.characteristics}
          />

          {/* Warning */}
          <WarningSection
            title={contentData.warning.title}
            quote={contentData.warning.quote}
            author={contentData.warning.author}
            message={contentData.warning.message}
          />

          {/* Conclusion */}
          <ConclusionSection text={contentData.conclusion.text} />

          {/* Content Navigation */}
          <ContentNavigation />
        </div>
      </div>
    </div>
  );
};

export default Content2Page;
