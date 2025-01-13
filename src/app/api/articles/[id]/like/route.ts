import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { Article } from '@/types/db'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id || !ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      )
    }

    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const client = await clientPromise
    const db = client.db("kana-learning-dev")
    
    const article = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(params.id) })

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const hasLiked = article.likedIps.includes(ip)
    
    const result = await db.collection<Article>("articles").updateOne(
      { _id: new ObjectId(params.id) },
      hasLiked
        ? {
            $inc: { likes: -1 },
            $pull: { likedIps: { $eq: ip } }
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

    const updatedArticle = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(params.id) })

    return NextResponse.json({
      success: true,
      likes: updatedArticle?.likes || 0,
      hasLiked: !hasLiked
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
