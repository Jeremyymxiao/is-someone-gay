'use client'

import { useState } from 'react'
import { ThumbsUp, Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { Comment } from '@/types'

interface CommentSectionProps {
  questionId: string
  initialComments: Comment[]
}

export default function CommentSection({
  questionId,
  initialComments
}: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !nickname.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/questions/${questionId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          nickname: nickname,
        }),
      })

      if (response.ok) {
        const comment = await response.json()
        setComments(prev => [...prev, comment])
        setNewComment('')
        setNickname('')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to post comment')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to post comment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLike = async (commentId: string) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/comments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId }),
      })

      if (response.ok) {
        setComments(prev =>
          prev.map(comment =>
            comment._id?.toString() === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        )
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Discussion ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your nickname"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          Post Comment
        </Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id?.toString()}
            className="border-b pb-4 last:border-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium">{comment.nickname}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-red-600"
              >
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="mt-2 text-gray-700">{comment.content}</p>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => comment._id && handleLike(comment._id.toString())}
              className="mt-2"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {comment.likes}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
