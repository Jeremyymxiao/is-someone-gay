import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
import { generateQuestionSlug, generateArticleSlug } from '../src/lib/utils'

// 加载 .env.local 文件
config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI || ''
const DB_NAME = 'kana-learning-dev'

async function main() {
  console.log('Starting migration...')
  
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db(DB_NAME)
    
    // 为questions集合添加slug
    const questions = await db.collection('questions').find({}).toArray()
    console.log(`Found ${questions.length} questions`)
    
    for (const question of questions) {
      const slug = generateQuestionSlug(question.title)
      // 检查是否存在重复的slug
      let finalSlug = slug
      let counter = 1
      while (await db.collection('questions').findOne({ slug: finalSlug, _id: { $ne: question._id } })) {
        finalSlug = `${slug}-${counter}`
        counter++
      }
      
      await db.collection('questions').updateOne(
        { _id: question._id },
        { $set: { slug: finalSlug } }
      )
      console.log(`Updated question: ${question.title} -> ${finalSlug}`)
    }
    
    // 为articles集合添加slug
    const articles = await db.collection('articles').find({}).toArray()
    console.log(`Found ${articles.length} articles`)
    
    for (const article of articles) {
      const slug = generateArticleSlug(article.title)
      // 检查是否存在重复的slug
      let finalSlug = slug
      let counter = 1
      while (await db.collection('articles').findOne({ slug: finalSlug, _id: { $ne: article._id } })) {
        finalSlug = `${slug}-${counter}`
        counter++
      }
      
      await db.collection('articles').updateOne(
        { _id: article._id },
        { $set: { slug: finalSlug } }
      )
      console.log(`Updated article: ${article.title} -> ${finalSlug}`)
    }
    
    // 创建唯一索引
    await db.collection('questions').createIndex({ slug: 1 }, { unique: true })
    await db.collection('articles').createIndex({ slug: 1 }, { unique: true })
    
    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

main() 