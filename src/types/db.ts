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
    likedIps: string[]
  }>
  createdAt: Date
  updatedAt: Date
}

// 数据库中的文章类型（包含_id）
export type Article = ArticleData & {
  _id: ObjectId
}

// 序列化后的评论类型
export type SerializedComment = {
  _id: string
  text: string
  nickname: string
  createdAt: string
  likes: number
  likedIps: string[]
}

// 序列化后的文章类型
export type SerializedArticle = {
  _id: string
  title: string
  content: string
  type: string
  views: number
  likes: number
  likedIps: string[]
  comments: SerializedComment[]
  createdAt: string
  updatedAt: string
}

// 序列化后的问题类型
export type SerializedQuestion = {
  _id: string
  id: string // 为了向后兼容
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
  comments: SerializedComment[]
  createdAt: string
  updatedAt: string
  relatedQuestions?: {
    _id: string
    id: string
    title: string
    votes: {
      yes: number
      no: number
      votedIps: {
        ip: string
        vote: 'yes' | 'no'
      }[]
    }
  }[]
}
