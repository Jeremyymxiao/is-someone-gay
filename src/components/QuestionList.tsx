"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import type { SerializedQuestion } from '@/types/db'

export default function QuestionList() {
  const [questions, setQuestions] = useState<SerializedQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [votingStates, setVotingStates] = useState<{[key: string]: boolean}>({})

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleVote = async (questionId: string, vote: 'yes' | 'no') => {
    // 防止重复投票
    if (votingStates[questionId]) return
    
    setVotingStates(prev => ({ ...prev, [questionId]: true }))
    
    try {
      const response = await fetch(`/api/questions/${questionId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      })

      const data = await response.json()
      
      if (data.success) {
        // 更新本地状态
        setQuestions(prevQuestions =>
          prevQuestions.map(q =>
            q._id === questionId
              ? {
                  ...q,
                  votes: {
                    ...q.votes,
                    [vote]: q.votes[vote] + 1,
                    votedIps: [
                      ...q.votes.votedIps,
                      {
                        ip: 'local', // 这里使用一个临时值，因为实际IP会在服务器端设置
                        vote: vote
                      }
                    ]
                  }
                }
              : q
          )
        )
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVotingStates(prev => ({ ...prev, [questionId]: false }))
    }
  }

  if (isLoading) {
    return <div className="text-center">Loading...</div>
  }

  if (questions.length === 0) {
    return <div className="text-center">No questions found</div>
  }

  return (
    <div className="space-y-6">
      {questions.map(question => (
        <Card
          key={question._id}
          className="p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${question.votes.yes > question.votes.no ? 'text-green-600' : ''}`}
                onClick={() => handleVote(question._id, 'yes')}
                disabled={votingStates[question._id]}
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="ml-1">{question.votes.yes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${question.votes.no > question.votes.yes ? 'text-red-600' : ''}`}
                onClick={() => handleVote(question._id, 'no')}
                disabled={votingStates[question._id]}
              >
                <ThumbsDown className="w-5 h-5" />
                <span className="ml-1">{question.votes.no}</span>
              </Button>
            </div>
            <div className="flex-1">
              <Link
                href={`/questions/${question._id}`}
                className="block"
              >
                <h2 className="text-xl font-semibold hover:text-blue-600 mb-4">
                  {question.title}
                </h2>
                {question.description && (
                  <p className="text-gray-600 mb-4">{question.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    {question.votes.yes + question.votes.no} votes
                  </span>
                  <span>•</span>
                  <time dateTime={question.createdAt}>
                    {formatDate(new Date(question.createdAt))}
                  </time>
                </div>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
