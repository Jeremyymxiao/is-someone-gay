import { notFound } from 'next/navigation'
import clientPromise from '@/lib/mongodb'
import ArticleDetail from '@/components/ArticleDetail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { Article } from '@/types/db'

interface PageProps {
  params: {
    slug: string
  }
}

async function getArticleBySlug(slug: string) {
  try {
    const client = await clientPromise
    const db = client.db("kana-learning-dev")
    
    const article = await db
      .collection<Article>("articles")
      .findOne({ slug })

    if (!article) {
      return null
    }

    return {
      ...article,
      _id: article._id.toString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      comments: (article.comments || []).map(comment => ({
        ...comment,
        _id: comment._id.toString(),
        createdAt: comment.createdAt.toISOString()
      }))
    }
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug)

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
            className="hover:bg-white/20"
          >
            <Link href="/articles">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        <ArticleDetail article={article} />
      </div>
    </main>
  )
}
