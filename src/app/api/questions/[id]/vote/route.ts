import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import type { Question } from '@/types/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("issomeonegay");
    
    const { voteType } = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    if (voteType !== 'yes' && voteType !== 'no') {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    // 首先检查问题是否存在以及用户是否已投票
    const question = await db
      .collection<Question>("questions")
      .findOne({ _id: new ObjectId(params.id) });

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const hasVoted = question.votes.votedIps.some(v => v.ip === ipAddress);
    if (hasVoted) {
      return NextResponse.json(
        { error: 'You have already voted' },
        { status: 400 }
      );
    }

    // 更新投票
    const updateResult = await db
      .collection<Question>("questions")
      .updateOne(
        { _id: new ObjectId(params.id) },
        {
          $inc: { [`votes.${voteType}`]: 1 },
          $push: {
            'votes.votedIps': {
              ip: ipAddress,
              vote: voteType
            }
          }
        }
      );

    if (!updateResult.acknowledged) {
      return NextResponse.json(
        { error: 'Failed to update vote' },
        { status: 500 }
      );
    }

    // 获取更新后的投票数据
    const updatedQuestion = await db
      .collection<Question>("questions")
      .findOne(
        { _id: new ObjectId(params.id) },
        { projection: { votes: 1 } }
      );

    if (!updatedQuestion) {
      return NextResponse.json(
        { error: 'Failed to fetch updated vote count' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      votes: {
        yes: updatedQuestion.votes.yes,
        no: updatedQuestion.votes.no
      }
    });
  } catch (e) {
    console.error('Error in vote API:', e);
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    );
  }
}

// 获取问题的投票状态
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("issomeonegay");
    
    const question = await db
      .collection<Question>("questions")
      .findOne(
        { _id: new ObjectId(params.id) },
        { projection: { votes: 1, type: 1, title: 1 } }
      );

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    const userVote = question.votes.votedIps.find(v => v.ip === ipAddress)?.vote;

    return NextResponse.json({
      success: true,
      votes: {
        yes: question.votes.yes,
        no: question.votes.no
      },
      userVote
    });
  } catch (e) {
    console.error('Error in get vote API:', e);
    return NextResponse.json(
      { error: 'Failed to get vote status' },
      { status: 500 }
    );
  }
}
