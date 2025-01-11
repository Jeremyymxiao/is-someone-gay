import { ObjectId } from 'mongodb'

// 基础问题类型（不包含_id）
export type QuestionData = {
  title: string
  description?: string
  type: 'preset' | 'user'
  votes: {
    yes: number
    no: number
    votedIps: {
      ip: string
      vote: 'yes' | 'no'
    }[]
  }
  comments: Array<{
    _id: ObjectId
    text: string
    nickname: string
    createdAt: Date
    likes: number
    likedIps: string[]
  }>
  createdAt: Date
  updatedAt: Date
}

// 数据库中的问题类型（包含_id）
export type Question = QuestionData & {
  _id: ObjectId
}

// 基础文章类型（不包含_id）
export type ArticleData = {
  title: string
  content: string
  type: string
  views: number
  likes: number
  likedIps: string[]
  comments: Array<{
    _id: ObjectId
    text: string
    nickname: string
    createdAt: Date
    likes: number
  }>
  createdAt: Date
  updatedAt: Date
}

// 数据库中的文章类型（包含_id）
export type Article = ArticleData & {
  _id: ObjectId
}
