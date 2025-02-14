import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function sanitizeTitle(title: string): string {
  return title.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/\s+/g, '');
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-')         // 将空格替换为连字符
    .replace(/-+/g, '-')          // 移除多余的连字符
    .replace(/^-+|-+$/g, '')      // 移除开头和结尾的连字符
}

export function generateQuestionSlug(title: string): string {
  // 确保标题以"is"开头
  const normalizedTitle = title.toLowerCase().startsWith('is ') ? title : `Is ${title}`
  return generateSlug(normalizedTitle)
}

export function generateArticleSlug(title: string): string {
  return generateSlug(title)
}
