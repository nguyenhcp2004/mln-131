"use client";

import { PostType } from "@/common/types/post.type";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TimelineDetailPageProps {
  post: PostType;
}

const TimelineDetailPage: React.FC<TimelineDetailPageProps> = ({ post }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }

    // Animate content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/timeline"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại Timeline
        </Link>

        {/* Header */}
        <div ref={headerRef} className="mb-8">
          {/* Milestone Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-600/20 backdrop-blur-md rounded-full border border-amber-500/30">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold text-lg">{post.milestone}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Short Description */}
          {post.shortDescription && (
            <p className="text-white/80 text-xl leading-relaxed">
              {post.shortDescription}
            </p>
          )}
        </div>

        {/* Main Content Card */}
        <div ref={contentRef} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          {/* Image */}
          {post.image && post.image.length > 0 && (
            <div className="w-full h-96 overflow-hidden">
              <img
                src={post.image[0]}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-amber-500/30 pb-2">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-semibold text-white mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-white/90 text-lg leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-white/90">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-white/90 leading-relaxed ml-4">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-amber-500 pl-4 py-2 my-6 bg-amber-900/20 rounded-r-lg">
                      <div className="text-amber-200 italic text-xl">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-amber-300 font-bold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-amber-200 italic">
                      {children}
                    </em>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Resource Links */}
            {post.linkResource && post.linkResource.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Tài liệu tham khảo
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.linkResource.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 text-amber-300 rounded-lg hover:bg-amber-600/40 transition-all duration-300 border border-amber-500/30 hover:border-amber-500/60 group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span className="font-medium">
                        {new URL(link).hostname.replace('www.', '')}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images */}
            {post.image && post.image.length > 1 && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Hình ảnh liên quan
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {post.image.slice(1).map((img, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg">
                      <img
                        src={img}
                        alt={`${post.title} - ${idx + 2}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineDetailPage;
