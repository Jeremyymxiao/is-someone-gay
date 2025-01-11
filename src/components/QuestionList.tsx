"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import type { Question } from '@/types/db'

type SerializedQuestion = {
  id: string
  title: string
  type: 'preset' | 'user'
  description?: string
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
  createdAt: string
  updatedAt: string
}

export default function QuestionList() {
  const [questions, setQuestions] = useState<SerializedQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/questions')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch questions')
        }
        
        setQuestions(data.questions)
      } catch (error) {
        console.error('Error:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch questions')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading questions...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  if (!questions.length) {
    return <div className="text-center py-8">No questions found.</div>
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <Card
          key={question.id}
          className="p-6 hover:shadow-md transition-shadow"
        >
          <Link
            href={`/questions/${question.id}`}
            className="block"
          >
            <h2 className="text-xl font-semibold hover:text-blue-600 mb-4">
              {question.title}
            </h2>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4 text-green-500" />
                  {question.votes.yes}
                </span>
                <span className="flex items-center">
                  <ThumbsDown className="mr-1 h-4 w-4 text-red-500" />
                  {question.votes.no}
                </span>
              </div>
              <time dateTime={question.createdAt}>
                {formatDate(new Date(question.createdAt))}
              </time>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}
