import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { ArticleDetail } from '@/components/ArticleDetail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Article } from '@/types/db'

interface PageProps {
  params: {
    id: string
  }
}

async function getArticle(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("issomeonegay")
    
    if (!ObjectId.isValid(id)) {
      return null
    }

    const article = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(id) })

    if (!article) {
      return null
    }

    // 序列化文章数据
    return {
      ...article,
      _id: article._id.toString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString()
    }
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.id)

  if (!article) {
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
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <Link href="/articles">
              <ChevronLeft className="w-4 h-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        <ArticleDetail article={article} />
      </div>
    </main>
  )
}
