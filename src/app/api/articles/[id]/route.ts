import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import type { Article } from '@/types/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("issomeonegay");
    
    const article = await db
      .collection<Article>("articles")
      .findOneAndUpdate(
        { _id: new ObjectId(params.id) },
        { $inc: { views: 1 } },
        { returnDocument: 'after' }
      );

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
