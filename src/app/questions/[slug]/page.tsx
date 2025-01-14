import { ObjectId } from 'mongodb'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import QuestionDetail from '@/components/QuestionDetail'
import { getMongoDb } from '@/lib/mongodb'
import { Question, SerializedQuestion } from '@/types/db'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const db = await getMongoDb()
  const question = await db.collection<Question>('questions').findOne({ slug: params.slug })

  if (!question) {
    return {
      title: 'Question Not Found',
      description: 'The question you are looking for does not exist.'
    }
  }

  return {
    title: question.title,
    description: question.description || `Vote and discuss: ${question.title}`
  }
}

export default async function QuestionPage({
  params: { slug },
}: Props) {
  const db = await getMongoDb()
  const question = await db
    .collection<Question>('questions')
    .findOne({ slug })

  if (!question) {
    notFound()
  }

  // 获取相关问题
  const relatedQuestions = await db
    .collection<Question>('questions')
    .find({
      _id: { $ne: question._id },
      type: question.type
    })
    .limit(3)
    .toArray()

  // 序列化问题数据
  const serializedQuestion: SerializedQuestion = {
    ...question,
    _id: question._id.toString(),
    id: question._id.toString(), // 添加 id 字段以保持向后兼容
    createdAt: question.createdAt.toISOString(),
    updatedAt: question.updatedAt.toISOString(),
    comments: question.comments.map(comment => ({
      ...comment,
      _id: comment._id.toString(),
      createdAt: comment.createdAt.toISOString()
    })),
    relatedQuestions: relatedQuestions.map(q => ({
      _id: q._id.toString(),
      id: q._id.toString(),
      title: q.title,
      slug: q.slug,
      votes: {
        yes: q.votes.yes,
        no: q.votes.no,
        votedIps: q.votes.votedIps
      }
    }))
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
        <QuestionDetail question={serializedQuestion} />
      </div>
    </main>
  )
}
