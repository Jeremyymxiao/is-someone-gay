import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { Article } from '@/types/db'

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('API: Handling like for article with slug:', params.slug)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const client = await clientPromise
    const db = client.db('kana-learning-dev')
    
    const article = await db.collection<Article>('articles').findOne({ slug: params.slug })

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const hasLiked = article.likedIps.includes(ip)
    
    const result = await db.collection<Article>('articles').updateOne(
      { slug: params.slug },
      hasLiked
        ? {
            $inc: { likes: -1 },
            $pull: { likedIps: ip }
          }
        : {
            $inc: { likes: 1 },
            $addToSet: { likedIps: ip }
          }
    )

    if (!result.modifiedCount) {
      return NextResponse.json(
        { error: 'Failed to update article' },
        { status: 500 }
      )
    }

    const updatedArticle = await db.collection<Article>('articles').findOne({ slug: params.slug })

    return NextResponse.json({
      success: true,
      likes: updatedArticle?.likes || 0,
      liked: !hasLiked
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 