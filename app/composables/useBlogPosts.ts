export type PostType = "native" | "x-article" | "medium";
export type ThoughtCategory = "research" | "engineering" | "building";
export type ContentType = NonNullable<NativePost["type"]>;

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  "engineering-note": "Engineering note",
  essay: "Essay",
  experiment: "Research experiment",
  "learning-log": "Learning record",
  "research-note": "Research note",
};

export const THOUGHT_CATEGORIES: Record<
  ThoughtCategory,
  { label: string; description: string }
> = {
  research: {
    label: "Research",
    description: "Research questions, experiments, agent systems, and evidence.",
  },
  engineering: {
    label: "Engineering",
    description: "Software, infrastructure, data systems, and implementation work.",
  },
  building: {
    label: "Building",
    description: "Projects, career, learning systems, and working practice.",
  },
};

export interface NativePost {
  stem: string;
  title: string;
  description?: string;
  date?: string;
  slug?: string;
  tags?: string[];
  image?: string;
  readingTime?: number;
  views?: number;
  source?: "hashnode";
  hashnodeId?: string;
  draft?: boolean;
  type?: "engineering-note" | "essay" | "experiment" | "learning-log" | "research-note";
  category?: ThoughtCategory;
  series?: string;
  part?: number;
  status?: string;
  featured?: boolean;
  portfolio?: boolean;
}

export interface NormalizedPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date: string;
  image?: string;
  tags: string[];
  type: PostType;
  href: string;
  isExternal: boolean;
  readTimeInMinutes?: number;
  views?: number;
  contentType?: NativePost["type"];
  series?: string;
  part?: number;
  category: ThoughtCategory;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  // Date-only strings parse as UTC; force local so the card date matches its year heading.
  const date = new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(dateString) ? `${dateString}T00:00:00` : dateString,
  );
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function postYear(dateString: string): string {
  return dateString.slice(0, 4);
}

export function postMonth(dateString: string): string {
  return MONTH_NAMES[Number(dateString.slice(5, 7)) - 1] ?? "";
}

export function obsidianImageToProxy(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith("/api/blog-image")) return src;
  // Strip leading slash or "./"
  const clean = src.replace(/^\//, "").replace(/^\.\//, "");
  const repoPath = clean.startsWith("images/") ? clean : `images/${clean}`;
  return `/api/blog-image?path=${encodeURIComponent(`Blogs - Published/${repoPath}`)}`;
}

const RESEARCH_TAGS = new Set([
  "ai-agents",
  "ai-coding-agents",
  "continuous-evaluation",
  "distribution-shift",
  "interference",
  "llm-serving",
  "nondeterminism",
  "null-result",
  "production-ai-systems",
  "research",
  "silent-regressions",
  "software-engineering-for-ai",
  "sports-research",
  "statistical-testing",
  "systems",
  "vllm",
]);

const BUILDING_TAGS = new Set([
  "buildingandlearning",
  "career",
  "motivation",
  "productivity",
  "research-method",
  "roadmap",
  "startup",
]);

const TAG_ALIASES: Record<string, string> = {
  go: "golang",
  html: "html5",
  "knowledge-management": "knowledge-management",
  knowledgemanagement: "knowledge-management",
  "production-ai-systems": "production-ai-systems",
  "software-engineering-for-ai": "software-engineering-for-ai",
};

export function normalizeTag(tag: string): string {
  const canonical = tag
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  return TAG_ALIASES[canonical] ?? canonical;
}

export function classifyThought(post: NativePost): ThoughtCategory {
  if (post.category) return post.category;
  const tags = post.tags?.map(normalizeTag) ?? [];
  if (tags.some((tag) => RESEARCH_TAGS.has(tag))) return "research";
  if (tags.some((tag) => BUILDING_TAGS.has(tag))) return "building";
  return "engineering";
}

export function normalizeObsidianPost(post: NativePost): NormalizedPost {
  // stem may be "Blogs - Published/post-title"; extract only the filename part
  const stemFile = post.stem.split("/").pop() ?? post.stem;
  const identifier = post.slug ?? stemFile;
  return {
    id: post.stem,
    title: post.title,
    slug: identifier,
    description: post.description,
    date: post.date ?? "",
    image: obsidianImageToProxy(post.image),
    tags: [...new Set((post.tags ?? []).map(normalizeTag))],
    // Hashnode is decommissioned. Imported posts now render from Obsidian like
    // every other native post; `source` only preserves migration metadata.
    type: "native",
    href: `/blog/${encodeURIComponent(identifier)}`,
    isExternal: false,
    readTimeInMinutes: post.readingTime,
    views: post.views,
    contentType: post.type,
    series: post.series,
    part: post.part,
    category: classifyThought(post),
  };
}

export function useNativePosts() {
  return useAsyncData("obsidian-posts", async () => {
    const posts = await queryCollection("blog").order("date", "DESC").all();
    return posts.filter((post) => !post.draft && post.status !== "draft" && post.status !== "archived");
  });
}
