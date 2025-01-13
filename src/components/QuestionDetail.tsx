"use client"

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Share2, Flag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import type { SerializedQuestion } from '@/types/db'

interface QuestionDetailProps {
  question: SerializedQuestion
}

export default function QuestionDetail({ question: initialQuestion }: QuestionDetailProps) {
  const [question, setQuestion] = useState<SerializedQuestion>(initialQuestion)
  const [comment, setComment] = useState({
    text: '',
    nickname: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVoting, setIsVoting] = useState(false)

  const totalVotes = question.votes.yes + question.votes.no
  const yesPercentage = totalVotes > 0 ? Math.round((question.votes.yes / totalVotes) * 100) : 0
  const noPercentage = totalVotes > 0 ? Math.round((question.votes.no / totalVotes) * 100) : 0

  const handleVote = async (vote: 'yes' | 'no') => {
    if (isVoting) return
    setIsVoting(true)

    try {
      const response = await fetch(`/api/questions/${question._id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vote })
      })

      if (!response.ok) throw new Error('Failed to vote')

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to vote')
      }

      setQuestion(prev => ({
        ...prev,
        votes: {
          ...prev.votes,
          [vote]: prev.votes[vote] + 1
        }
      }))
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to vote. Please try again later.')
    } finally {
      setIsVoting(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.text || !comment.nickname) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/questions/${question._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
      })

      if (!response.ok) throw new Error('Failed to submit comment')

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit comment')
      }

      setQuestion(prev => ({
        ...prev,
        comments: [...prev.comments, data.comment]
      }))

      setComment({
        text: '',
        nickname: ''
      })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to submit comment. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{question.title}</h1>
      
      {question.description && (
        <p className="text-gray-600 mb-8">{question.description}</p>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{totalVotes}</span>
            <span className="text-gray-500">total votes</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('yes')}
              disabled={isVoting}
              className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <ThumbsUp className="w-4 h-4" />
              Vote Yes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleVote('no')}
              disabled={isVoting}
              className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <ThumbsDown className="w-4 h-4" />
              Vote No
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500 transition-all duration-300 flex items-center justify-end pr-2"
              style={{ width: `${yesPercentage}%` }}
            >
              <div className="flex items-center gap-1 text-white font-medium">
                <ThumbsUp className="w-4 h-4" />
                <span>{yesPercentage}%</span>
              </div>
            </div>
            <div
              className="h-full bg-red-500 transition-all duration-300 flex items-center justify-start pl-2"
              style={{ width: `${noPercentage}%` }}
            >
              <div className="flex items-center gap-1 text-white font-medium">
                <ThumbsDown className="w-4 h-4" />
                <span>{noPercentage}%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <div>{question.votes.yes} votes</div>
            <div>{question.votes.no} votes</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Comments ({question.comments.length})
        </h2>
        <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium mb-1">
              Nickname
            </label>
            <Input
              id="nickname"
              value={comment.nickname}
              onChange={e => setComment(prev => ({
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
              value={comment.text}
              onChange={e => setComment(prev => ({
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
          {question.comments.map(comment => (
            <Card key={comment._id} className="p-4">
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
            </Card>
          ))}
        </div>
      </div>

      {question.relatedQuestions && question.relatedQuestions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Related Questions</h2>
          <div className="space-y-4">
            {question.relatedQuestions.map(related => (
              <Card key={related._id} className="p-4">
                <Link
                  href={`/questions/${related._id}`}
                  className="block hover:text-blue-600"
                >
                  <h3 className="font-medium">{related.title}</h3>
                  <div className="text-sm text-gray-500 mt-2">
                    {related.votes.yes + related.votes.no} votes
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
