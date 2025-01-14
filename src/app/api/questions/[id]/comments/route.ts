import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Comment } from '@/types';

interface RouteParams {
  params: { id: string }
}

export async function POST(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = context.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid question ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("kana-learning-dev");
    
    const data = await request.json();
    const commentId = new ObjectId();
    const comment: Comment = {
      _id: commentId,
      nickname: data.nickname,
      content: data.text,
      createdAt: new Date(),
      likes: 0,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      likedIps: []
    };

    const result = await db.collection("questions").updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } as any }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      comment: {
        _id: commentId.toString(),
        nickname: comment.nickname,
        text: comment.content,
        createdAt: comment.createdAt.toISOString(),
        likes: comment.likes,
        likedIps: comment.likedIps
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteParams
) {
  try {
    const { id } = context.params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid question ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("kana-learning-dev");
    
    const data = await request.json();
    const { commentId } = data;

    if (!ObjectId.isValid(commentId)) {
      return NextResponse.json(
        { error: 'Invalid comment ID' },
        { status: 400 }
      );
    }

    const result = await db.collection("questions").updateOne(
      { 
        _id: new ObjectId(id),
        "comments._id": new ObjectId(commentId)
      },
      { 
        $inc: { "comments.$.likes": 1 },
        $push: { "comments.$.likedIps": request.headers.get('x-forwarded-for') || 'unknown' } 
      } as any
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: 'Question or comment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}
