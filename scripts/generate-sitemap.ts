import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

import { getMongoDb } from '../src/lib/mongodb'
import { writeFileSync } from 'fs'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

async function generateSitemap() {
  try {
    const db = await getMongoDb()
    
    // 获取所有问题
    const questions = await db.collection('questions').find({}, { projection: { slug: 1, updatedAt: 1 } }).toArray()
    
    // 获取所有文章
    const articles = await db.collection('articles').find({}, { projection: { slug: 1, updatedAt: 1 } }).toArray()

    // 生成 XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 静态页面 -->
  <url>
    <loc>${BASE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/questions</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/articles</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 问题页面 -->
  ${questions.map(question => `
  <url>
    <loc>${BASE_URL}/questions/${question.slug}</loc>
    <lastmod>${new Date(question.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- 文章页面 -->
  ${articles.map(article => `
  <url>
    <loc>${BASE_URL}/articles/${article.slug}</loc>
    <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`

    // 写入文件
    writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap)
    console.log('Sitemap generated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateSitemap() 