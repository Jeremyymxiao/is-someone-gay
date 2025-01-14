import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { SerializedComment, Article } from '@/types/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('API: Adding comment to article with slug:', params.slug)
    const { text, nickname } = await request.json()

    // 验证输入
    if (!text || !nickname) {
      return NextResponse.json(
        { error: 'Text and nickname are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('kana-learning-dev')

    const article = await db.collection<Article>('articles').findOne({ slug: params.slug })
    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const now = new Date()
    const newComment = {
      _id: new ObjectId(),
      text,
      nickname,
      createdAt: now,
      likes: 0,
      likedIps: []
    }

    const result = await db.collection<Article>('articles').updateOne(
      { slug: params.slug },
      {
        $push: { comments: newComment },
        $set: { updatedAt: now }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const serializedComment: SerializedComment = {
      _id: newComment._id.toString(),
      text: newComment.text,
      nickname: newComment.nickname,
      createdAt: newComment.createdAt.toISOString(),
      likes: newComment.likes,
      likedIps: newComment.likedIps
    }

    return NextResponse.json({
      success: true,
      comment: serializedComment
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('API: Getting comments for article with slug:', params.slug)
    const client = await clientPromise
    const db = client.db('kana-learning-dev')

    const article = await db.collection<Article>('articles').findOne(
      { slug: params.slug },
      { projection: { comments: 1 } }
    )

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const serializedComments: SerializedComment[] = article.comments?.map(comment => ({
      _id: comment._id.toString(),
      text: comment.text,
      nickname: comment.nickname,
      createdAt: comment.createdAt.toISOString(),
      likes: comment.likes,
      likedIps: comment.likedIps
    })) || []

    return NextResponse.json({
      success: true,
      comments: serializedComments
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 