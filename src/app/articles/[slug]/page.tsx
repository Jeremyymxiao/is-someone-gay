import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArticleDetail from '@/components/ArticleDetail'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import clientPromise from '@/lib/mongodb'
import type { Article, SerializedArticle } from '@/types/db'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    console.log('Generating metadata for slug:', params.slug)
    console.log('Connecting to MongoDB for metadata...')
    const client = await clientPromise
    console.log('Connected to MongoDB')
    const db = client.db('kana-learning-dev')
    console.log('Got database instance')
    
    const article = await db.collection<Article>('articles').findOne({ slug: params.slug })
    console.log('Article found:', article ? 'yes' : 'no')
    console.log('Article data:', article)

    if (!article) {
      console.log('Article not found, returning 404 metadata')
      return {
        title: 'Article Not Found',
        description: 'The article you are looking for does not exist.'
      }
    }

    console.log('Returning article metadata')
    return {
      title: article.title,
      description: article.content.slice(0, 200)
    }
  } catch (error) {
    console.error('Failed to generate metadata:', error)
    return {
      title: 'Error',
      description: 'An error occurred while loading the article.'
    }
  }
}

export default async function ArticlePage({
  params: { slug },
}: Props) {
  try {
    console.log('Rendering page for slug:', slug)
    console.log('Connecting to MongoDB for article...')
    const client = await clientPromise
    console.log('Connected to MongoDB')
    const db = client.db('kana-learning-dev')
    console.log('Got database instance')
    
    const article = await db.collection<Article>('articles').findOne({ slug })
    console.log('Article found:', article ? 'yes' : 'no')
    console.log('Article data:', article)

    if (!article) {
      console.log('Article not found, triggering 404')
      notFound()
    }

    // 更新浏览量
    console.log('Updating view count')
    await db.collection<Article>('articles').updateOne(
      { slug },
      { $inc: { views: 1 } }
    )

    // 序列化文章数据
    console.log('Serializing article data')
    const serializedArticle: SerializedArticle = {
      ...article,
      _id: article._id.toString(),
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
      comments: article.comments?.map(comment => ({
        ...comment,
        _id: comment._id.toString(),
        createdAt: comment.createdAt.toISOString()
      })) || []
    }

    console.log('Rendering article page')
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
          <ArticleDetail article={serializedArticle} />
        </div>
      </main>
    )
  } catch (error) {
    console.error('Failed to load article:', error)
    throw error
  }
} 