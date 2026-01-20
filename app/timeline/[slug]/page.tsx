import { posts } from "@/common/constants/posts";
import TimelineDetailPage from "@/features/timeline/TimelineDetailPage";
import { notFound } from "next/navigation";

interface TimelineDetailRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function TimelineDetailRoute({ params }: TimelineDetailRouteProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <TimelineDetailPage post={post} />;
}

// Generate static params for all posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
