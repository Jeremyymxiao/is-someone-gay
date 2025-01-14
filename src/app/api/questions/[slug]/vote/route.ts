import { NextResponse } from 'next/server';
import { getMongoDb } from '@/lib/mongodb';
import { Question } from '@/types/db';

type VoteType = 'yes' | 'no';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { vote } = await request.json() as { vote: VoteType };
    
    if (!vote || !['yes', 'no'].includes(vote)) {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    const db = await getMongoDb();
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // 查找问题并更新投票
    const question = await db.collection<Question>('questions').findOne({ slug: params.slug });
    
    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // 检查是否已经投票
    const existingVote = question.votes.votedIps.find((v: { ip: string; vote: VoteType }) => v.ip === ip);
    if (existingVote) {
      if (existingVote.vote === vote) {
        return NextResponse.json(
          { error: 'Already voted' },
          { status: 400 }
        );
      }
      
      // 更新现有投票
      await db.collection('questions').updateOne(
        { slug: params.slug, 'votes.votedIps.ip': ip },
        {
          $set: { 'votes.votedIps.$.vote': vote } as any,
          $inc: {
            [`votes.${vote}`]: 1,
            [`votes.${existingVote.vote}`]: -1
          }
        }
      );
    } else {
      // 添加新投票
      await db.collection('questions').updateOne(
        { slug: params.slug },
        {
          $push: { 'votes.votedIps': { ip, vote } } as any,
          $inc: { [`votes.${vote}`]: 1 }
        }
      );
    }

    const updatedQuestion = await db.collection<Question>('questions').findOne({ slug: params.slug });
    
    return NextResponse.json({
      success: true,
      votes: updatedQuestion?.votes
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// 获取问题的投票状态
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const db = await getMongoDb();
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const question = await db.collection<Question>('questions').findOne({ slug: params.slug });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const userVote = question.votes.votedIps.find((v: { ip: string; vote: VoteType }) => v.ip === ip)?.vote;

    return NextResponse.json({
      success: true,
      votes: question.votes,
      userVote
    });
  } catch (error) {
    console.error('Get vote status error:', error);
    return NextResponse.json(
      { error: 'Failed to get vote status' },
      { status: 500 }
    );
  }
}
