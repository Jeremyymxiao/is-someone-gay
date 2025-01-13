import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { Article } from '@/types/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id || !ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("kana-learning-dev");
    
    const article = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(params.id) });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // 更新浏览量
    await db.collection<Article>("articles").updateOne(
      { _id: new ObjectId(params.id) },
      { $inc: { views: 1 } }
    );

    // 序列化文章数据
    const serializedArticle = {
      _id: article._id.toString(),
      title: article.title,
      content: article.content,
      type: article.type,
      views: article.views + 1, // 增加浏览量
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
    };

    return NextResponse.json({
      success: true,
      article: serializedArticle
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
