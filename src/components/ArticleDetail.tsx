"use client"

import { useState } from 'react'
import { Article } from '@/types/db'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThumbsUp, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

type SerializedArticle = Omit<Article, '_id' | 'createdAt' | 'updatedAt'> & {
  _id: string
  createdAt: string
  updatedAt: string
}

interface ArticleDetailProps {
  article: SerializedArticle
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [likes, setLikes] = useState(article.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await fetch(`/api/articles/${article._id}/like`, {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.success) {
        setLikes(data.likes)
        setIsLiked(data.liked)
      }
    } catch (error) {
      console.error('Failed to like article:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views} views
          </span>
          <span>•</span>
          <time dateTime={article.createdAt}>
            {formatDate(new Date(article.createdAt))}
          </time>
        </div>
        <div className="prose max-w-none">
          {article.content || 'No content available'}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
