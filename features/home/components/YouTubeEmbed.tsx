"use client";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

const YouTubeEmbed = ({
  videoId,
  title = "YouTube video",
}: YouTubeEmbedProps) => {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-100 mb-3">
            Video
          </h2>
          <p className="text-amber-200/80 text-lg">
            Các nguyên tắc cốt lõi
          </p>
        </div>

        {/* Video Container with Glassmorphism */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ paddingBottom: "56.25%" }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeEmbed;
