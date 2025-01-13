import { NextRequest, NextResponse } from 'next/server'
import { ObjectId, UpdateFilter } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { SerializedComment, Article } from '@/types/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { text, nickname } = await request.json()

    // 验证输入
    if (!text || !nickname) {
      return NextResponse.json(
        { error: 'Text and nickname are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("kana-learning-dev")

    let articleId: ObjectId | null = null

    if (ObjectId.isValid(params.id)) {
      articleId = new ObjectId(params.id)
    } else {
      const article = await db.collection<Article>("articles").findOne({ slug: params.id })
      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        )
      }
      articleId = article._id
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

    const update: UpdateFilter<Article> = {
      $push: {
        comments: newComment
      },
      $set: {
        updatedAt: now
      }
    }

    const result = await db.collection<Article>("articles").updateOne(
      { _id: articleId },
      update
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
    console.error('Failed to add comment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("kana-learning-dev")

    let articleId: ObjectId | null = null

    if (ObjectId.isValid(params.id)) {
      articleId = new ObjectId(params.id)
    } else {
      const article = await db.collection<Article>("articles").findOne({ slug: params.id })
      if (!article) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        )
      }
      articleId = article._id
    }

    const article = await db.collection<Article>("articles").findOne(
      { _id: articleId },
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

    return NextResponse.json({ comments: serializedComments })
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
