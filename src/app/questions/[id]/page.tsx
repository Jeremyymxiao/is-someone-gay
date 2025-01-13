import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import QuestionDetail from '@/components/QuestionDetail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Question } from '@/types/db'

interface PageProps {
  params: {
    id: string
  }
}

async function getQuestion(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("kana-learning-dev")
    
    if (!ObjectId.isValid(id)) {
      return null
    }

    const question = await db
      .collection<Question>("questions")
      .findOne({ _id: new ObjectId(id) })

    if (!question) {
      return null
    }

    // 获取相关问题
    const relatedQuestions = await db
      .collection<Question>("questions")
      .find({
        _id: { $ne: new ObjectId(id) },
        type: question.type
      })
      .limit(3)
      .toArray()

    return {
      ...question,
      _id: question._id.toString(),
      id: question._id.toString(), // 添加id字段以保持向后兼容
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
      comments: (question.comments || []).map(comment => ({
        ...comment,
        _id: comment._id.toString(),
        createdAt: comment.createdAt.toISOString()
      })),
      relatedQuestions: relatedQuestions.map(q => ({
        _id: q._id.toString(),
        id: q._id.toString(),
        title: q.title,
        votes: {
          yes: q.votes.yes,
          no: q.votes.no,
          votedIps: q.votes.votedIps
        }
      }))
    }
  } catch (error) {
    console.error('Failed to fetch question:', error)
    return null
  }
}

export default async function QuestionPage({ params }: PageProps) {
  const question = await getQuestion(params.id)

  if (!question) {
    notFound()
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/questions">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Questions
          </Button>
        </Link>
      </div>
      <QuestionDetail question={question} />
    </div>
  )
}
