import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { Question, QuestionData } from '@/types/db';
import type { Filter } from 'mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    console.log('Connecting to MongoDB...');
    const client = await clientPromise;
    console.log('Connected to MongoDB');
    
    const dbName = "kana-learning-dev";
    const db = client.db(dbName);
    console.log('Using database:', dbName);
    
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    console.log('Query type:', type);
    
    // 构建查询条件
    const query: Filter<Question> = 
      (type === 'preset' || type === 'user') ? { type: type as 'preset' | 'user' } : {};
    console.log('MongoDB query:', JSON.stringify(query));
    
    // 获取所有问题
    const questions = await db
      .collection<Question>("questions")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    console.log('Found questions:', questions.length);
    if (questions.length > 0) {
      console.log('First question:', {
        title: questions[0].title,
        type: questions[0].type,
        votes: questions[0].votes
      });
    }

    // 获取所有集合
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // 序列化问题
    const serializedQuestions = questions.map(q => ({
      id: q._id.toString(),
      title: q.title,
      type: q.type,
      description: q.description,
      votes: q.votes,
      comments: q.comments.map(c => ({
        ...c,
        id: c._id.toString(),
        createdAt: c.createdAt.toISOString()
      })),
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      questions: serializedQuestions,
      debug: {
        dbName: db.databaseName,
        collections: collections.map(c => c.name),
        questionCount: questions.length,
        query: query
      }
    });
  } catch (e) {
    console.error('Error in get questions API:', e);
    return NextResponse.json(
      { 
        success: false,
        error: e instanceof Error ? e.message : 'Unknown error',
        errorDetails: e instanceof Error ? e.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const dbName = "kana-learning-dev";
    const db = client.db(dbName);
    console.log('Using database:', dbName);
    
    const data = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // 验证必填字段
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const now = new Date();
    const newQuestion: QuestionData = {
      title: data.title,
      description: data.description || '',
      type: 'user',
      votes: {
        yes: 0,
        no: 0,
        votedIps: []
      },
      comments: [],
      createdAt: now,
      updatedAt: now
    };

    const result = await db
      .collection<Question>("questions")
      .insertOne(newQuestion as any);

    if (!result.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to create question' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      question: {
        id: result.insertedId.toString(),
        ...newQuestion,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
      }
    });
  } catch (e) {
    console.error('Error in create question API:', e);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
