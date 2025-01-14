import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getMongoDb } from '@/lib/mongodb';
import { Question, CommentSubmission, SerializedQuestion } from '@/types/db';

function serializeQuestion(question: Question): SerializedQuestion {
  return {
    ...question,
    _id: question._id.toString(),
    id: question._id.toString(),
    createdAt: question.createdAt.toISOString(),
    updatedAt: question.updatedAt.toISOString(),
    comments: question.comments.map(comment => ({
      ...comment,
      _id: comment._id.toString(),
      createdAt: comment.createdAt.toISOString()
    }))
  };
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { text, nickname } = await request.json() as CommentSubmission;
    
    if (!text || !nickname) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getMongoDb();
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const comment = {
      _id: new ObjectId(),
      text,
      nickname,
      createdAt: new Date(),
      likes: 0,
      likedIps: []
    };

    const result = await db.collection<Question>('questions').updateOne(
      { slug: params.slug },
      { $push: { comments: comment } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // 获取更新后的问题数据
    const updatedQuestion = await db.collection<Question>('questions').findOne({ slug: params.slug });
    if (!updatedQuestion) {
      throw new Error('Failed to fetch updated question');
    }

    const serializedQuestion = serializeQuestion(updatedQuestion);
    const serializedComment = serializedQuestion.comments[serializedQuestion.comments.length - 1];

    return NextResponse.json({
      success: true,
      comment: serializedComment
    });
  } catch (error) {
    console.error('Comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const db = await getMongoDb();
    const question = await db.collection<Question>('questions').findOne(
      { slug: params.slug },
      { projection: { comments: 1 } }
    );

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const serializedQuestion = serializeQuestion(question);

    return NextResponse.json({
      success: true,
      comments: serializedQuestion.comments
    });
  } catch (error) {
    console.error('Get comments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
