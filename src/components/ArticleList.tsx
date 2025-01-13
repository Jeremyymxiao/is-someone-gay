'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ThumbsUp, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { SerializedArticle } from '@/types/db'

export default function ArticleList() {
  const [articles, setArticles] = useState<SerializedArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch articles')
        }
        setArticles(data.articles)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (articles.length === 0) {
    return <div className="text-center">No articles found</div>
  }

  return (
    <div className="space-y-6">
      {articles.map(article => (
        <Card
          key={article._id}
          className="p-6 hover:shadow-md transition-shadow"
        >
          <Link
            href={`/articles/${article._id}`}
            className="block"
          >
            <h2 className="text-xl font-semibold hover:text-blue-600 mb-4">
              {article.title}
            </h2>
            <div className="text-gray-600 mb-4 line-clamp-2">
              {article.content}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views} views
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {article.likes} likes
              </span>
              <span>•</span>
              <time dateTime={article.createdAt}>
                {formatDate(new Date(article.createdAt))}
              </time>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
