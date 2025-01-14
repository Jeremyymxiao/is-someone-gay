'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VoteSectionProps {
  slug: string
  votes: {
    yes: number
    no: number
  }
  yesPercentage: number
  noPercentage: number
}

export default function VoteSection({
  slug,
  votes,
  yesPercentage,
  noPercentage
}: VoteSectionProps) {
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null)
  const [localVotes, setLocalVotes] = useState(votes)

  useEffect(() => {
    async function fetchVoteStatus() {
      try {
        const response = await fetch(`/api/questions/${slug}/vote`)
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setUserVote(data.userVote)
            setHasVoted(data.userVote !== null)
            setLocalVotes(data.votes)
          }
        }
      } catch (error) {
        console.error('Error fetching vote status:', error)
      }
    }

    fetchVoteStatus()
  }, [slug])

  const handleVote = async (voteType: 'yes' | 'no') => {
    if (hasVoted || isVoting) return

    setIsVoting(true)
    try {
      const response = await fetch(`/api/questions/${slug}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote: voteType }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setLocalVotes(data.votes)
          setUserVote(voteType)
          setHasVoted(true)
        } else {
          alert(data.error || 'Failed to vote')
        }
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
          className={`flex-1 ${userVote === 'yes' ? 'bg-green-50 text-green-600' : ''}`}
          onClick={() => handleVote('yes')}
          disabled={hasVoted || isVoting}
        >
          <ThumbsUp className="mr-2 h-4 w-4" />
          Yes ({localVotes.yes})
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={`flex-1 ${userVote === 'no' ? 'bg-red-50 text-red-600' : ''}`}
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
