import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { Article } from '@/types/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("issomeonegay");

    // 获取用户IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    
    // 检查文章是否存在
    const article = await db
      .collection<Article>("articles")
      .findOne({ _id: new ObjectId(params.id) });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // 检查用户是否已经点赞
    if (article.likedIps.includes(ipAddress)) {
      // 取消点赞
      const result = await db
        .collection<Article>("articles")
        .findOneAndUpdate(
          { _id: new ObjectId(params.id) },
          { 
            $inc: { likes: -1 },
            $pull: { likedIps: ipAddress }
          },
          { returnDocument: 'after' }
        );

      return NextResponse.json({
        success: true,
        liked: false,
        likes: result?.likes || 0
      });
    } else {
      // 添加点赞
      const result = await db
        .collection<Article>("articles")
        .findOneAndUpdate(
          { _id: new ObjectId(params.id) },
          { 
            $inc: { likes: 1 },
            $addToSet: { likedIps: ipAddress }
          },
          { returnDocument: 'after' }
        );

      return NextResponse.json({
        success: true,
        liked: true,
        likes: result?.likes || 0
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to update like status' },
      { status: 500 }
    );
  }
}
