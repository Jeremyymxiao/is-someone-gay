import { ObjectId } from 'mongodb';

export interface Question {
  _id?: ObjectId;
  title: string;
  description?: string;
  votes: {
    yes: number;
    no: number;
  };
  comments: Comment[];
  createdAt: Date;
  ipAddress: string;
}

export interface Comment {
  _id: ObjectId;
  nickname: string;
  content: string;
  createdAt: Date;
  likes: number;
  ipAddress: string;
  likedIps?: string[];
}

export interface Article {
  _id?: ObjectId;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  readTime: string;
  createdAt: Date;
  relatedQuestions: ObjectId[];
}
