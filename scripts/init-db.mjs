import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const names = [
  "Billie Eilish",
  "Hugh Jackman",
  "Tyler the Creator",
  "Frank Ocean",
  "Harry Styles",
  "Tony Hinchcliffe",
  "Diddy",
  "Eminem",
  "John Travolta",
  "Usher",
  "Chappell Roan",
  "David Muir",
  "Erik Menendez",
  "Lil Nas X",
  "Lindsey Graham",
  "P Diddy",
  "Pedro Pascal",
  "Will Smith",
  "Caleb Williams",
  "Conan Gray"
];

async function main() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please set MONGODB_URI environment variable');
  }

  console.log('Connecting to MongoDB...');
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const dbName = "kana-learning-dev";
    const db = client.db(dbName);
    console.log('Using database:', dbName);
    
    // 清空现有的问题集合
    await db.collection("questions").deleteMany({});
    console.log('Cleared existing questions');

    // 创建预设问题集合
    const presetQuestions = names.map(name => ({
      title: `Is ${name} Gay?`,
      description: `Vote and discuss whether ${name} is gay.`,
      type: 'preset',
      votes: {
        yes: Math.floor(Math.random() * 100),
        no: Math.floor(Math.random() * 100),
        votedIps: []
      },
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // 插入预设问题
    const result = await db.collection("questions").insertMany(presetQuestions);
    console.log(`Inserted ${result.insertedCount} preset questions`);

    // 创建索引
    await db.collection("questions").createIndex({ type: 1 });
    await db.collection("questions").createIndex({ title: "text" });
    await db.collection("questions").createIndex({ createdAt: -1 });
    console.log('Created indexes');

    // 验证插入的数据
    const insertedQuestions = await db.collection("questions").find({}).toArray();
    console.log('First inserted question:', {
      title: insertedQuestions[0]?.title,
      type: insertedQuestions[0]?.type
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

main();
