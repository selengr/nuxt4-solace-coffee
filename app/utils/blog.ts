import matter from 'gray-matter'
import { marked } from 'marked'

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  tags: string[]
  path: string
}

export interface BlogPost extends BlogPostMeta {
  html: string
}

const rawPosts = import.meta.glob('../../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function slugFromPath(filePath: string) {
  const file = filePath.split('/').pop() || ''
  return file.replace(/\.md$/, '')
}

function parsePost(filePath: string, raw: string): BlogPost {
  const { data, content } = matter(raw)
  const slug = slugFromPath(filePath)

  return {
    slug,
    path: `/blog/${slug}`,
    title: String(data.title || slug),
    description: String(data.description || ''),
    date: String(data.date || ''),
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: marked.parse(content, { async: false }) as string,
  }
}

export function getAllPosts(): BlogPostMeta[] {
  return Object.entries(rawPosts)
    .map(([filePath, raw]) => {
      const post = parsePost(filePath, raw)
      const { html: _html, ...meta } = post
      return meta
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const entry = Object.entries(rawPosts).find(([filePath]) =>
    slugFromPath(filePath) === slug,
  )
  if (!entry) {
    return undefined
  }
  return parsePost(entry[0], entry[1])
}
