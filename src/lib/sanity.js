import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-05-21';

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source) {
  return builder?.image(source);
}

function normalizePost(post) {
  const date = post.date?.split('T')[0] || null;

  return {
    ...post,
    slug: post.slug,
    date,
    tags: post.tags || [],
    summary: post.summary || '',
    content: post.content || [],
    body: post.body || null,
  };
}

const postsQuery = `*[_type == "post" && defined(slug.current)] | order(coalesce(date, publishedAt) desc) {
  title,
  "slug": slug.current,
  "date": coalesce(date, publishedAt),
  summary,
  tags,
  coverImage,
  body
}`;

export async function fetchSanityPosts() {
  if (!sanityClient) return [];

  const posts = await sanityClient.fetch(postsQuery);
  return posts.map(normalizePost);
}
