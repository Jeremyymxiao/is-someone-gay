import { MongoClient } from 'mongodb'
import { names } from '../src/data/names'

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please set MONGODB_URI environment variable')
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const db = client.db('issomeonegay')

    // 创建预设问题集合
    const presetQuestions = names.map(name => ({
      name,
      type: 'preset',
      votes: {
        yes: 0,
        no: 0,
        ips: []
      },
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    // 清空现有的预设问题（如果存在）
    await db.collection('questions').deleteMany({ type: 'preset' })

    // 插入预设问题
    const result = await db.collection('questions').insertMany(presetQuestions)
    console.log(`Successfully inserted ${result.insertedCount} preset questions`)

    // 创建索引
    await db.collection('questions').createIndex({ type: 1 })
    await db.collection('questions').createIndex({ name: 1 }, { unique: true, partialFilterExpression: { type: 'preset' } })
    await db.collection('questions').createIndex({ 'votes.ips': 1 })
    await db.collection('questions').createIndex({ createdAt: -1 })

    console.log('Database initialization completed successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
  } finally {
    await client.close()
  }
}

main()
