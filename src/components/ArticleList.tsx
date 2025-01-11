"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Eye, ThumbsUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/types/db'

type SerializedArticle = Omit<Article, '_id' | 'createdAt' | 'updatedAt'> & {
  _id: string
  createdAt: string
  updatedAt: string
}

export default function ArticleList() {
  const [articles, setArticles] = useState<SerializedArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setArticles(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading articles...</div>
  }

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <article
          key={article._id}
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
        >
          <Link
            href={`/articles/${article._id}`}
            className="block"
          >
            <h2 className="text-xl font-semibold hover:text-blue-600">
              {article.title}
            </h2>
            
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {article.views} views
              </span>
              <span>•</span>
              <span className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4" />
                {article.likes} likes
              </span>
              <span>•</span>
              <time dateTime={article.createdAt}>
                {formatDate(new Date(article.createdAt))}
              </time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
