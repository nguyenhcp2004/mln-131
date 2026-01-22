"use client";

import { use } from "react";
import { notFound, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import TextExplainerUI from "@/features/chat/TextExplainerUI";
import { getPostBySlug } from "@/features/tai-lieu/data";
import AudioPlayer from "@/components/AudioPlayer";

export default function TaiLieuSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 sm:mb-8 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Quay lại
          </button>

          <div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20"
            data-page-content
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 justify-between">
                <div className="inline-block px-3 py-1 bg-amber-600/20 backdrop-blur-sm border border-amber-600/30 rounded-full mb-4">
                  <span className="text-amber-200 text-sm font-medium">
                    {post.milestone}
                  </span>
                </div>
                {post.audio && (
                  <div className="mb-4">
                    <AudioPlayer src={post.audio} title={post.title} />
                  </div>
                )}
              </div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                data-page-title
              >
                {post.title}
              </h1>
              <p className="text-white/80 text-base sm:text-lg">
                {post.shortDescription}
              </p>
            </div>

            {post.image && post.image.length > 0 && (
              <div className="mb-6 space-y-4">
                {post.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${post.title} - ${index + 1}`}
                    className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
                  />
                ))}
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/90 prose-strong:text-amber-200 prose-li:text-white/90 prose-blockquote:border-amber-500 prose-blockquote:text-white/80 text-white">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {post.linkResource && post.linkResource.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-white font-semibold mb-3">
                  Tài liệu tham khảo:
                </h3>
                <ul className="space-y-2">
                  {post.linkResource.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:text-amber-200 underline text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <TextExplainerUI isEnabled={true} />
    </>
  );
}
