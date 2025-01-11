'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoteSectionProps {
  questionId: string
  votes: {
    yes: number
    no: number
  }
  yesPercentage: number
  noPercentage: number
}

export default function VoteSection({
  questionId,
  votes,
  yesPercentage,
  noPercentage
}: VoteSectionProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [localVotes, setLocalVotes] = useState(votes)

  const handleVote = async (voteType: 'yes' | 'no') => {
    if (hasVoted || isVoting) return

    setIsVoting(true)
    try {
      const response = await fetch(`/api/questions/${questionId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteType }),
      })

      if (response.ok) {
        setLocalVotes(prev => ({
          ...prev,
          [voteType]: prev[voteType] + 1
        }))
        setHasVoted(true)
        localStorage.setItem(`vote_${questionId}`, voteType)
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to vote')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to vote')
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">
          Total votes: {localVotes.yes + localVotes.no}
        </span>
      </div>
      
      <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
        <div 
          className="h-full bg-green-500 flex items-center justify-center text-white"
          style={{ width: `${yesPercentage}%` }}
        >
          {yesPercentage}% Yes
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => handleVote('yes')}
          disabled={hasVoted || isVoting}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Yes ({localVotes.yes})
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => handleVote('no')}
          disabled={hasVoted || isVoting}
        >
          <ThumbsDown className="mr-2 h-4 w-4" />
          No ({localVotes.no})
        </Button>
      </div>

      {hasVoted && (
        <p className="text-center mt-4 text-sm text-gray-500">
          Thank you for voting!
        </p>
      )}
    </div>
  )
}
