"use client"

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Share2, Flag } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import type { Question } from '@/types/db'

type SerializedQuestion = {
  id: string
  title: string
  description?: string
  type: 'preset' | 'user'
  votes: {
    yes: number
    no: number
    votedIps: {
      ip: string
      vote: 'yes' | 'no'
    }[]
  }
  comments: Array<{
    id: string
    text: string
    nickname: string
    createdAt: string
    likes: number
    likedIps: string[]
  }>
  relatedQuestions?: Array<{
    id: string
    title: string
    votes: {
      yes: number
      no: number
    }
  }>
  createdAt: string
  updatedAt: string
}

interface QuestionDetailProps {
  question: SerializedQuestion
}

export default function QuestionDetail({ question: initialQuestion }: QuestionDetailProps) {
  const [question, setQuestion] = useState<SerializedQuestion>(initialQuestion)
  const [newComment, setNewComment] = useState('')
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalVotes = question.votes.yes + question.votes.no
  const yesPercentage = totalVotes > 0 ? Math.round((question.votes.yes / totalVotes) * 100) : 0
  const noPercentage = 100 - yesPercentage

  const handleVote = async (voteType: 'yes' | 'no') => {
    try {
      const response = await fetch(`/api/questions/${question.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      })

      if (!response.ok) throw new Error('Failed to vote')
      // TODO: Update vote counts
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const handleSubmitComment = async () => {
    if (!nickname.trim() || !newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/questions/${question.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, content: newComment }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post comment');
      }

      const newCommentData = await response.json();
      
      // Update comments list with the new comment
      setQuestion(prev => ({
        ...prev,
        comments: [...prev.comments, newCommentData]
      }));

      // Reset form
      setNewComment('')
      setNickname('')
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {question.title}
          </h1>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {question.description && (
          <p className="mt-4 text-gray-600">{question.description}</p>
        )}

        <div className="mt-8">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Total votes: {totalVotes}</span>
            <span className="text-gray-500">Created: {formatDate(new Date(question.createdAt))}</span>
          </div>
          
          <div className="h-8 bg-gray-200 rounded-lg overflow-hidden flex">
            <div 
              className="h-full bg-green-500 flex items-center justify-center text-white transition-all"
              style={{ width: `${yesPercentage}%` }}
            >
              {yesPercentage > 10 && `${yesPercentage}% Yes`}
            </div>
            <div 
              className="h-full bg-red-500 flex items-center justify-center text-white transition-all"
              style={{ width: `${noPercentage}%` }}
            >
              {noPercentage > 10 && `${noPercentage}% No`}
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <Button
              variant="outline"
              className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 border-green-200"
              onClick={() => handleVote('yes')}
            >
              <ThumbsUp className="mr-2 h-5 w-5" />
              Yes ({question.votes.yes})
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 border-red-200"
              onClick={() => handleVote('no')}
            >
              <ThumbsDown className="mr-2 h-5 w-5" />
              No ({question.votes.no})
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Discussion</h2>
        
        <div className="space-y-4 mb-6">
          <Input
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Textarea
            placeholder="Add to the discussion..."
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting}
          >
            Post Comment
          </Button>
        </div>

        <div className="space-y-4">
          {question.comments?.map((comment) => (
            <div key={comment.id.toString()} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{comment.nickname}</span>
                <span className="text-gray-500 text-sm">
                  {formatDate(new Date(comment.createdAt))}
                </span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
              <div className="mt-2 flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {comment.likes}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {(question.relatedQuestions?.length ?? 0) > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Related Questions</h2>
          <div className="space-y-4">
            {question.relatedQuestions?.map((related) => (
              <div
                key={related.id.toString()}
                className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg"
              >
                <Link 
                  href={`/questions/${related.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {related.title}
                </Link>
                <div className="text-sm text-gray-500">
                  <span className="mr-4">Yes: {related.votes.yes}</span>
                  <span>No: {related.votes.no}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
