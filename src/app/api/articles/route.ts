import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { Article } from '@/types/db';
import type { Filter, Sort } from 'mongodb';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("kana-learning-dev");
    
    const articles = await db
      .collection<Article>("articles")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    const serializedArticles = articles.map(article => ({
      _id: article._id.toString(),
      title: article.title,
      content: article.content,
      type: article.type,
      views: article.views,
      likes: article.likes,
      likedIps: article.likedIps || [],
      comments: article.comments?.map(comment => ({
        _id: comment._id.toString(),
        text: comment.text,
        nickname: comment.nickname,
        createdAt: comment.createdAt.toISOString(),
        likes: comment.likes,
        likedIps: comment.likedIps || []
      })) || [],
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString()
    }));

    return NextResponse.json({
      success: true,
      articles: serializedArticles
    });
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("kana-learning-dev");
    
    const data = await request.json();
    
    if (!data.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

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
      articleId: result.insertedId.toString()
    });
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    );
  }
}
