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
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getQuestion(id: string) {
  try {
    const client = await clientPromise
    const dbName = "kana-learning-dev"
    const db = client.db(dbName)
    console.log('Using database:', dbName)
    
    if (!ObjectId.isValid(id)) {
      console.log('Invalid ObjectId:', id)
      return null
    }

    console.log('Fetching question with id:', id)
    const question = await db
      .collection<Question>("questions")
      .findOne({ _id: new ObjectId(id) })

    if (!question) {
      console.log('Question not found:', id)
      return null
    }

    // Get related questions
    console.log('Fetching related questions')
    const relatedQuestions = await db
      .collection<Question>("questions")
      .find({
        _id: { $ne: new ObjectId(id) },
        // Add more relevance criteria here
      })
      .limit(3)
      .toArray()

    console.log('Found', relatedQuestions.length, 'related questions')

    // Serialize the data
    const serializedQuestion = {
      id: question._id.toString(),
      title: question.title,
      description: question.description,
      type: question.type,
      votes: question.votes,
      comments: (question.comments || []).map(comment => ({
        id: comment._id.toString(),
        text: comment.text,
        nickname: comment.nickname,
        createdAt: comment.createdAt.toISOString(),
        likes: comment.likes,
        likedIps: comment.likedIps
      })),
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
      relatedQuestions: relatedQuestions.map(q => ({
        id: q._id.toString(),
        title: q.title,
        votes: q.votes
      }))
    }

    console.log('Successfully serialized question data')
    return serializedQuestion
  } catch (error) {
    console.error('Error in getQuestion:', error)
    throw error
  }
}

export default async function QuestionPage({ params, searchParams }: PageProps) {
  const question = await getQuestion(params.id)

  if (!question) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hover:bg-white/20"
          >
            <Link href="/questions">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Link>
          </Button>
        </div>
        <QuestionDetail question={question} />
      </div>
    </main>
  )
}
