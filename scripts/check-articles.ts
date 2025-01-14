import { MongoClient } from 'mongodb'
import type { Article } from '../src/types/db'

const uri = 'mongodb+srv://Jeremyym:Dn9GjguauPhE2N9@kana-learning-dev.o0psd.mongodb.net/?retryWrites=true&w=majority&appName=kana-learning-dev'

async function checkArticles() {
  console.log('Checking articles in database...')
  
  try {
    const client = new MongoClient(uri)
    await client.connect()
    
    const db = client.db('kana-learning-dev')
    
    // 获取所有文章
    const articles = await db.collection<Article>('articles').find().toArray()

    console.log(`Found ${articles.length} articles`)

    articles.forEach(article => {
      console.log({
        title: article.title,
        slug: article.slug,
        _id: article._id.toString()
      })
    })

    console.log('Check completed')
    await client.close()
  } catch (error) {
    console.error('Check failed:', error)
    process.exit(1)
  }
}

checkArticles() 