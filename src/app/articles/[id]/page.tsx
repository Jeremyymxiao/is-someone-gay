import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import ArticleDetail from '@/components/ArticleDetail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Article, SerializedArticle } from '@/types/db'

interface PageProps {
  params: {
    id: string
  }
}

async function getArticle(id: string): Promise<SerializedArticle | null> {
  try {
    if (!ObjectId.isValid(id)) {
      return null
    }

    const client = await clientPromise
    const db = client.db("kana-learning-dev")
    
    const article = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(id) })

    if (!article) {
      return null
    }

    // 更新浏览量
    await db.collection<Article>("articles").updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    )

    // 序列化文章数据
    return {
      _id: article._id.toString(),
      title: article.title,
      content: article.content,
      type: article.type,
      views: article.views + 1,
      likes: article.likes,
      likedIps: article.likedIps || [],
      comments: article.comments?.map(comment => ({
        _id: comment._id.toString(),
        text: comment.text,
        nickname: comment.nickname,
        createdAt: comment.createdAt.toISOString(),
        likes: comment.likes,
        likedIps: comment.likedIps || []
      })) || [],
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
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/articles">
          <Button variant="ghost" size="sm" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Articles
          </Button>
        </Link>
      </div>
      <ArticleDetail article={article} />
    </div>
  )
}
