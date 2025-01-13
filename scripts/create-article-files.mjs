import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');

const articles = [
  {
    title: "When Was Gay Marriage Legalized?",
    slug: "when-was-gay-marriage-legalized"
  },
  {
    title: "When Was Gay Marriage Legalized In California?",
    slug: "when-was-gay-marriage-legalized-in-california"
  },
  {
    title: "What Does The Bible Say About Being Gay?",
    slug: "what-does-the-bible-say-about-being-gay"
  },
  {
    title: "What Does God Say About Being Gay?",
    slug: "what-does-god-say-about-being-gay"
  },
  {
    title: "Can You Be Gay And Christian?",
    slug: "can-you-be-gay-and-christian"
  },
  {
    title: "Is Gay Marriage Legal In Japan?",
    slug: "is-gay-marriage-legal-in-japan"
  },
  {
    title: "What Does It Mean To Be Gay?",
    slug: "what-does-it-mean-to-be-gay"
  },
  {
    title: "What Percent Of The Population Is Gay?",
    slug: "what-percent-of-the-population-is-gay"
  },
  {
    title: "Do Gays Get Stoned In Palestine?",
    slug: "do-gays-get-stoned-in-palestine"
  },
  {
    title: "Does One Piercing Mean You're Gay?",
    slug: "does-one-piercing-mean-youre-gay"
  },
  {
    title: "Does Nick Parnets Know He Is Gay?",
    slug: "does-nick-parnets-know-he-is-gay"
  },
  {
    title: "Does Gay Sex Have Shit Smell?",
    slug: "does-gay-sex-have-shit-smell"
  },
  {
    title: "How Do You Tell Your Bestfriend They Are Gay?",
    slug: "how-do-you-tell-your-bestfriend-they-are-gay"
  },
  {
    title: "Was Being Gay In The Army A Dishonorable?",
    slug: "was-being-gay-in-the-army-a-dishonorable"
  },
  {
    title: "What Are The Variables In Gay Lussac's Law?",
    slug: "what-are-the-variables-in-gay-lussacs-law"
  },
  {
    title: "What Is The Difference Between Queer And Gay?",
    slug: "what-is-the-difference-between-queer-and-gay"
  },
  {
    title: "Who Made The Word Gay Different Meaning?",
    slug: "who-made-the-word-gay-different-meaning"
  },
  {
    title: "Why Is Taylor Swift So Popular With The Gays?",
    slug: "why-is-taylor-swift-so-popular-with-the-gays"
  }
];

async function createArticleFiles() {
  // 确保目录存在
  await fs.mkdir(ARTICLES_DIR, { recursive: true });
  
  for (const article of articles) {
    const metaPath = path.join(ARTICLES_DIR, `${article.slug}.meta.json`);
    const contentPath = path.join(ARTICLES_DIR, `${article.slug}.md`);
    
    // 创建元数据文件
    const meta = {
      title: article.title,
      slug: article.slug,
      type: "preset",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await fs.writeFile(metaPath, JSON.stringify(meta, null, 2));
    
    // 创建内容文件
    const content = `# ${article.title}

This is a placeholder content for the article "${article.title}". 
The actual content will be added later.

## Introduction

## Main Content

## Conclusion`;
    
    await fs.writeFile(contentPath, content);
    
    console.log(`Created files for article: ${article.title}`);
  }
}

createArticleFiles().catch(console.error);
