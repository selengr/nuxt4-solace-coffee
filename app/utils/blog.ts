import matter from 'gray-matter'
import { marked } from 'marked'

export type BlogLocale = 'en' | 'fa'

export interface BlogPostMeta {
  slug: string
  locale: BlogLocale
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

const rawPosts = import.meta.glob('../../content/blog/*/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function localeFromPath(filePath: string): BlogLocale {
  if (filePath.includes('/blog/fa/')) {
    return 'fa'
  }
  return 'en'
}

function slugFromPath(filePath: string) {
  const file = filePath.split('/').pop() || ''
  return file.replace(/\.md$/, '')
}

function parsePost(filePath: string, raw: string): BlogPost {
  const { data, content } = matter(raw)
  const slug = slugFromPath(filePath)
  const locale = localeFromPath(filePath)

  return {
    slug,
    locale,
    path: `/blog/${slug}`,
    title: String(data.title || slug),
    description: String(data.description || ''),
    date: String(data.date || ''),
    author: data.author ? String(data.author) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    html: marked.parse(content, { async: false }) as string,
  }
}

export function getAllPosts(locale: BlogLocale = 'en'): BlogPostMeta[] {
  return Object.entries(rawPosts)
    .map(([filePath, raw]) => {
      const post = parsePost(filePath, raw)
      const { html: _html, ...meta } = post
      return meta
    })
    .filter(post => post.locale === locale)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getPostBySlug(
  slug: string,
  locale: BlogLocale = 'en',
): BlogPost | undefined {
  const entry = Object.entries(rawPosts).find(([filePath]) =>
    slugFromPath(filePath) === slug && localeFromPath(filePath) === locale,
  )
  if (!entry) {
    return undefined
  }
  return parsePost(entry[0], entry[1])
}
