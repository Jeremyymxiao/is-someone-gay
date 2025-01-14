import { MongoClient } from 'mongodb'
import type { Article } from '../src/types/db'

const uri = 'mongodb+srv://Jeremyym:Dn9GjguauPhE2N9@kana-learning-dev.o0psd.mongodb.net/?retryWrites=true&w=majority&appName=kana-learning-dev'
const slug = 'which-ear-is-the-gay-ear'

async function checkArticle() {
  console.log(`Checking article with slug: ${slug}`)
  
  try {
    const client = new MongoClient(uri)
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('kana-learning-dev')
    
    // 获取文章
    const article = await db.collection<Article>('articles').findOne({ slug })
    
    if (article) {
      console.log('Article found:', {
        _id: article._id.toString(),
        title: article.title,
        slug: article.slug,
        content: article.content.slice(0, 100) + '...'
      })
    } else {
      console.log('Article not found')
    }

    // 列出所有文章的 slug
    console.log('\nListing all article slugs:')
    const slugs = await db.collection<Article>('articles')
      .find({}, { projection: { slug: 1 } })
      .toArray()
    
    console.log(slugs.map(doc => doc.slug))

    await client.close()
  } catch (error) {
    console.error('Check failed:', error)
    process.exit(1)
  }
}

checkArticle() 