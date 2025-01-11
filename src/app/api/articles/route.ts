import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { Article } from '@/types/db';
import type { Filter, Sort } from 'mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const dbName = "kana-learning-dev";
    const db = client.db(dbName);
    console.log('Using database:', dbName);
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const sort = searchParams.get('sort') || 'latest'; // 'latest', 'popular', 'trending'
    
    // 构建查询条件
    const query: Filter<Article> = 
      (type === 'preset') ? { type: 'preset' } : {};
    console.log('MongoDB query:', JSON.stringify(query));
    
    // 构建排序条件
    const sortOptions: Record<string, Sort> = {
      latest: { createdAt: -1 },
      popular: { views: -1 },
      trending: { likes: -1 }
    };
    
    const articles = await db
      .collection<Article>("articles")
      .find(query)
      .sort(sortOptions[sort] || sortOptions.latest)
      .limit(20)
      .toArray();

    console.log('Found articles:', articles.length);
    if (articles.length > 0) {
      console.log('First article:', {
        title: articles[0].title,
        type: articles[0].type
      });
    }

    return NextResponse.json(articles);
  } catch (e) {
    console.error('Error in get articles API:', e);
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

// POST endpoint for creating new articles
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const dbName = "kana-learning-dev";
    const db = client.db(dbName);
    console.log('Using database:', dbName);
    
    const data = await request.json();
    const article: Omit<Article, '_id'> = {
      title: data.title,
      content: data.content,
      type: 'user',
      views: 0,
      likes: 0,
      likedIps: [],
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection<Article>("articles").insertOne(article as Article);
    return NextResponse.json({ 
      success: true,
      articleId: result.insertedId 
    });
  } catch (e) {
    console.error('Error in create article API:', e);
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
