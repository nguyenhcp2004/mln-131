export type PostType = {
  id: number;
  slug: string;
  audio?: string;
  title: string;
  shortDescription?: string;
  content: string;
  image?: string[];
  linkResource?: string[];
  milestone: string;
};
