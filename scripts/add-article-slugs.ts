import { config } from 'dotenv'
import { getMongoDb } from '../src/lib/mongodb'
import type { Article } from '../src/types/db'

// 加载环境变量
config({ path: '.env.local' })

async function addSlugsToArticles() {
  console.log('Starting article slug migration...')
  
  try {
    const db = await getMongoDb()
    
    // 获取所有没有 slug 的文章
    const articles = await db.collection<Article>('articles').find({
      $or: [
        { slug: { $exists: false } },
        { slug: '' }
      ]
    }).toArray()

    console.log(`Found ${articles.length} articles without slugs`)

    for (const article of articles) {
      const slug = article.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      await db.collection<Article>('articles').updateOne(
        { _id: article._id },
        { 
          $set: { 
            slug,
            updatedAt: new Date()
          } 
        }
      )

      console.log(`Updated article: ${article.title} -> ${slug}`)
    }

    // 创建唯一索引
    await db.collection<Article>('articles').createIndex(
      { slug: 1 },
      { unique: true }
    )

    console.log('Migration completed successfully')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

addSlugsToArticles() 