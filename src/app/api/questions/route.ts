import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';
import type { Question } from '@/types/db';
import type { Filter } from 'mongodb';

export async function GET(request: Request) {
  try {
    const db = await getMongoDb();
    
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    // 构建查询条件
    const query: Filter<Question> = 
      (type === 'preset' || type === 'user') ? { type: type as 'preset' | 'user' } : {};
    
    // 获取所有问题
    const questions = await db
      .collection<Question>("questions")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    // 序列化问题
    const serializedQuestions = questions.map(q => ({
      _id: q._id.toString(),
      id: q._id.toString(), // 添加 id 字段用于向后兼容
      title: q.title,
      slug: q.slug,
      type: q.type,
      description: q.description,
      votes: q.votes,
      comments: (q.comments || []).map(c => ({
        _id: c._id.toString(),
        text: c.text,
        nickname: c.nickname,
        createdAt: c.createdAt.toISOString(),
        likes: c.likes,
        likedIps: c.likedIps || []
      })),
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      questions: serializedQuestions
    });
  } catch (error) {
    console.error('Error in get questions API:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await getMongoDb();
    
    const data = await request.json();

    // 验证必填字段
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const question: Omit<Question, '_id'> = {
      title: data.title,
      slug: data.slug,
      description: data.description || '',
      type: 'user',
      votes: {
        yes: 0,
        no: 0,
        votedIps: []
      },
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection<Question>("questions").insertOne(question as Question);
    
    return NextResponse.json({ 
      success: true,
      questionId: result.insertedId.toString()
    });
  } catch (error) {
    console.error('Error in create question API:', error);
    return NextResponse.json(
      { error: 'Failed to create question' },
      { status: 500 }
    );
  }
}
