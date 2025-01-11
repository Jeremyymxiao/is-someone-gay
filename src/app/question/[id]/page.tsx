import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import VoteSection from '@/components/VoteSection'
import CommentSection from '@/components/CommentSection'
import { formatDate } from '@/lib/utils'
import type { Question } from '@/types'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = await clientPromise
  const db = client.db("issomeonegay")
  const question = await db.collection("questions").findOne({
    _id: new ObjectId(params.id)
  }) as Question

  return {
    title: question.title,
    description: question.description || `Vote and discuss: ${question.title}`
  }
}

export default async function QuestionPage({ params }: Props) {
  const client = await clientPromise
  const db = client.db("issomeonegay")
  const question = await db.collection("questions").findOne({
    _id: new ObjectId(params.id)
  }) as Question

  const totalVotes = question.votes.yes + question.votes.no
  const yesPercentage = totalVotes > 0 
    ? Math.round((question.votes.yes / totalVotes) * 100)
    : 0
  const noPercentage = 100 - yesPercentage

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Questions
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {question.title}
          </h1>
          
          {question.description && (
            <p className="mt-4 text-gray-600">
              {question.description}
            </p>
          )}

          <div className="mt-8">
            <VoteSection
              questionId={params.id}
              votes={question.votes}
              yesPercentage={yesPercentage}
              noPercentage={noPercentage}
            />
          </div>

          <div className="mt-8 pt-8 border-t">
            <CommentSection
              questionId={params.id}
              initialComments={question.comments}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
