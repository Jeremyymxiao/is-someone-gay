"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { formatDate } from '@/lib/utils'
import { SerializedComment } from '@/types/db'

interface CommentsProps {
  articleId: string
  initialComments: SerializedComment[]
}

export function Comments({ articleId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<SerializedComment[]>(initialComments)
  const [nickname, setNickname] = useState('')
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/articles/${articleId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, text }),
      })

      const data = await response.json()
      if (data.success) {
        setComments([data.comment, ...comments])
        setNickname('')
        setText('')
      }
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-4">
          <Input
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            maxLength={50}
            className="max-w-md"
          />
          <Textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            maxLength={1000}
            className="min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full max-w-[200px]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment._id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{comment.nickname}</span>
                <time className="text-sm text-gray-500">
                  {formatDate(new Date(comment.createdAt))}
                </time>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
            </CardContent>
          </Card>
        ))}
        
        {comments.length === 0 && (
          <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}
