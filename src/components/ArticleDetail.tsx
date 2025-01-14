"use client"

import { useState } from 'react'
import { Article, SerializedArticle } from '@/types/db'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThumbsUp, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { Comments } from '@/components/Comments'

interface ArticleDetailProps {
  article: SerializedArticle
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const [likes, setLikes] = useState(article.likes)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLike = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const response = await fetch(`/api/articles/${article.slug}/like`, {
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
          <span>{formatDate(new Date(article.createdAt))}</span>
        </div>
        <div className="prose max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${isLiked ? 'text-blue-600' : ''}`}
          onClick={handleLike}
          disabled={isLoading}
        >
          <ThumbsUp className="w-4 h-4" />
          {likes} Likes
        </Button>
      </CardFooter>
      <Comments articleSlug={article.slug} initialComments={article.comments} />
    </Card>
  )
}
