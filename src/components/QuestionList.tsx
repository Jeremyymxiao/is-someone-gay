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
  const [userVotes, setUserVotes] = useState<{[key: string]: 'yes' | 'no' | null}>({})

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

        // 获取每个问题的用户投票状态
        const votes: {[key: string]: 'yes' | 'no' | null} = {}
        await Promise.all(
          data.questions
            .filter((question: SerializedQuestion) => question.slug) // 只处理有 slug 的问题
            .map(async (question: SerializedQuestion) => {
              try {
                const voteResponse = await fetch(`/api/questions/${question.slug}/vote`)
                if (!voteResponse.ok) {
                  console.warn(`Failed to fetch vote status for question ${question.slug}`)
                  return
                }
                const voteData = await voteResponse.json()
                if (voteData.success) {
                  votes[question.slug] = voteData.userVote
                }
              } catch (error) {
                console.error('Error fetching vote status:', error)
              }
            })
        )
        setUserVotes(votes)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleVote = async (slug: string, vote: 'yes' | 'no') => {
    if (!slug) return // 如果没有 slug，直接返回
    // 防止重复投票
    if (votingStates[slug] || userVotes[slug] !== null) return
    
    setVotingStates(prev => ({ ...prev, [slug]: true }))
    
    try {
      const response = await fetch(`/api/questions/${slug}/vote`, {
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
            q.slug === slug
              ? {
                  ...q,
                  votes: data.votes
                }
              : q
          )
        )
        // 更新用户投票状态
        setUserVotes(prev => ({
          ...prev,
          [slug]: vote
        }))
      }
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVotingStates(prev => ({ ...prev, [slug]: false }))
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
                className={`p-2 ${
                  userVotes[question.slug] === 'yes' 
                    ? 'text-green-600 bg-green-50' 
                    : question.votes.yes > question.votes.no 
                      ? 'text-green-600' 
                      : ''
                }`}
                onClick={() => handleVote(question.slug, 'yes')}
                disabled={votingStates[question.slug] || userVotes[question.slug] !== null}
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="ml-1">{question.votes.yes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 ${
                  userVotes[question.slug] === 'no' 
                    ? 'text-red-600 bg-red-50' 
                    : question.votes.no > question.votes.yes 
                      ? 'text-red-600' 
                      : ''
                }`}
                onClick={() => handleVote(question.slug, 'no')}
                disabled={votingStates[question.slug] || userVotes[question.slug] !== null}
              >
                <ThumbsDown className="w-5 h-5" />
                <span className="ml-1">{question.votes.no}</span>
              </Button>
            </div>
            <div className="flex-1">
              <Link
                href={`/questions/${question.slug}`}
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
