"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ThumbsUp, Share2, Flag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { SerializedComment } from '@/types/db'

interface CommentsProps {
  articleSlug: string
  initialComments: SerializedComment[]
}

export function Comments({ articleSlug, initialComments }: CommentsProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState({
    text: '',
    nickname: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.text || !newComment.nickname) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/articles/${articleSlug}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      })

      const data = await response.json()
      if (data.success) {
        setComments(prev => [...prev, data.comment])
        setNewComment({
          text: '',
          nickname: ''
        })
      } else {
        alert(data.error || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
      alert('Failed to add comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Comments ({comments.length})
      </h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium mb-1">
            Nickname
          </label>
          <Input
            id="nickname"
            value={newComment.nickname}
            onChange={e => setNewComment(prev => ({
              ...prev,
              nickname: e.target.value
            }))}
            placeholder="Enter your nickname"
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Comment
          </label>
          <Textarea
            id="comment"
            value={newComment.text}
            onChange={e => setNewComment(prev => ({
              ...prev,
              text: e.target.value
            }))}
            placeholder="Write your comment..."
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map(comment => (
          <Card key={comment._id} className="p-4">
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{comment.nickname}</span>
                <time className="text-sm text-gray-500">
                  {formatDate(new Date(comment.createdAt))}
                </time>
              </div>
              <p className="text-gray-600">{comment.text}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {comment.likes}
                </span>
                <button className="hover:text-blue-600">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="hover:text-red-600">
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
