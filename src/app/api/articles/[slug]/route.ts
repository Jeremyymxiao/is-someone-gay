import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { Article } from '@/types/db'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('API: Getting article with slug:', params.slug)
    const client = await clientPromise
    const db = client.db('kana-learning-dev')
    
    const article = await db.collection<Article>('articles').findOne({ slug: params.slug })

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    // 更新浏览量
    await db.collection<Article>('articles').updateOne(
      { slug: params.slug },
      { $inc: { views: 1 } }
    )

    // 序列化文章数据
    const serializedArticle = {
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

    return NextResponse.json({
      success: true,
      article: serializedArticle
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 