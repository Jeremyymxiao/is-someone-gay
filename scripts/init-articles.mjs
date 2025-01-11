import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const articles = [
  {
    title: "can you be gay and christian?",
    content: `The relationship between being gay and Christian is a topic of ongoing discussion within religious communities. Here's a comprehensive overview:

Different Christian Perspectives:

1. Affirming Churches and Organizations:
- Fully accept LGBTQ+ Christians
- Perform same-sex marriages
- View sexual orientation as part of God's creation
- Focus on love and inclusion

2. Traditional Views:
- Maintain traditional biblical interpretation
- Distinguish between orientation and behavior
- May accept LGBTQ+ people while not affirming relationships
- Focus on traditional doctrine

3. Middle Ground Approaches:
- Seek to balance tradition with modern understanding
- Emphasize pastoral care and support
- Focus on individual faith journeys
- Promote dialogue and understanding

Personal Faith Journey:

1. Reconciliation:
- Many LGBTQ+ Christians successfully integrate faith and identity
- Find affirming faith communities
- Develop personal relationship with God
- Interpret scripture through contemporary lens

2. Support Resources:
- LGBTQ+ Christian organizations
- Affirming churches and ministries
- Online communities and forums
- Books and educational materials

3. Theological Understanding:
- Modern biblical scholarship
- Historical context of scripture
- Cultural interpretation
- Progressive theology

Practical Considerations:

1. Finding Community:
- Research affirming churches
- Connect with LGBTQ+ Christian groups
- Build support network
- Share experiences with others

2. Personal Growth:
- Develop strong spiritual foundation
- Maintain authentic self
- Balance faith and identity
- Continue learning and growing

3. Advocacy and Education:
- Share personal story
- Support others in journey
- Promote understanding
- Work for change within faith communities

Key Messages:
- Many LGBTQ+ people maintain strong Christian faith
- Numerous affirming churches and organizations exist
- Personal faith journey is unique to each individual
- Support and resources are available
- Both identity and faith can coexist harmoniously`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "what does god say about being gay?",
    content: `Different religious traditions and interpretations offer varying perspectives on what God says about being gay. Here's an overview of different viewpoints:

Religious Perspectives:

1. Traditional Views:
- Interpret religious texts as prohibiting same-sex relationships
- Emphasize traditional marriage and family structures
- Focus on procreation as a divine purpose

2. Progressive Views:
- Emphasize God's love and acceptance for all people
- Focus on broader spiritual principles of love and inclusion
- View sexual orientation as part of human diversity

3. Modern Religious Movements:
- Many denominations now fully accept LGBTQ+ people
- Some perform same-sex marriages
- Emphasize spiritual over literal interpretations

Key Theological Arguments:

1. Love and Acceptance:
- God loves all creation
- Focus on divine acceptance
- Emphasis on human dignity

2. Personal Relationship with God:
- Individual spiritual journeys
- Direct connection with divine
- Personal interpretation of faith

3. Religious Reform:
- Evolution of religious understanding
- Historical context of texts
- Modern theological scholarship

Practical Considerations:

1. Faith Communities:
- Varying levels of acceptance
- Support groups available
- LGBTQ+-affirming congregations exist

2. Personal Faith:
- Individual spiritual journey
- Reconciling identity and beliefs
- Finding supportive community

3. Religious Counseling:
- LGBTQ+-affirming religious counselors
- Support for faith exploration
- Mental health resources

Important Notes:
- Views vary widely among and within religions
- Personal interpretation plays a role
- Support communities exist
- Faith and identity can coexist
- Religious understanding continues to evolve`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "what does the bible say about being gay?",
    content: `The interpretation of biblical passages regarding homosexuality is a complex and debated topic among religious scholars and communities. Here's an overview of the key points and various interpretations:

Commonly Cited Passages:

1. Old Testament:
- Leviticus 18:22 and 20:13
- Genesis 19 (Story of Sodom and Gomorrah)

2. New Testament:
- Romans 1:26-27
- 1 Corinthians 6:9-10
- 1 Timothy 1:9-10

Different Interpretations:

1. Traditional Interpretation:
- Views these passages as condemning homosexual behavior
- Maintains that marriage is between a man and a woman
- Emphasizes biblical sexual ethics

2. Progressive Interpretation:
- Considers historical and cultural context
- Argues that modern understanding of sexual orientation wasn't known in biblical times
- Focuses on broader themes of love and acceptance

3. Scholarly Perspectives:
- Examine original languages and contexts
- Debate precise meanings of key terms
- Consider cultural norms of biblical times

Modern Religious Responses:

1. Conservative Views:
- Maintain traditional interpretations
- Often oppose same-sex relationships
- Emphasize biblical authority

2. Liberal Views:
- Focus on inclusive interpretation
- Emphasize love and acceptance
- Support LGBTQ+ inclusion in religious communities

3. Middle Ground Approaches:
- Distinguish between orientation and behavior
- Seek balance between tradition and modern understanding
- Emphasize pastoral care and compassion

Important Considerations:
- Biblical interpretation varies among denominations
- Cultural context affects understanding
- Personal faith journeys differ
- Many LGBTQ+ people reconcile faith and identity
- Support communities exist for LGBTQ+ people of faith`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "when was gay marriage legalized in California?",
    content: `The path to marriage equality in California has been complex and marked by several legal changes. Here's the timeline:

Key Events:
1. February 12, 2004:
- San Francisco Mayor Gavin Newsom authorizes same-sex marriages
- About 4,000 couples marry before the California Supreme Court halts them
- These marriages were later voided

2. May 15, 2008:
- California Supreme Court rules ban on same-sex marriage unconstitutional
- Same-sex marriages begin on June 16, 2008
- Approximately 18,000 same-sex couples marry during this period

3. November 4, 2008:
- Proposition 8 passes, amending state constitution to ban same-sex marriage
- Previously performed marriages remain valid
- New same-sex marriages are prohibited

4. August 4, 2010:
- Federal District Court declares Proposition 8 unconstitutional
- Decision is appealed, keeping Prop 8 in effect during appeals

5. June 26, 2013:
- U.S. Supreme Court dismisses Prop 8 appeal
- Same-sex marriages resume in California on June 28, 2013
- This date marks the permanent legalization of same-sex marriage in California

6. June 26, 2015:
- U.S. Supreme Court's Obergefell v. Hodges decision
- Confirms and reinforces the right to same-sex marriage nationwide

Current Status:
- Same-sex marriage is fully legal in California
- All marriage rights and benefits apply equally to same-sex couples
- California recognizes same-sex marriages from other states and countries`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "when was gay marriage legalized?",
    content: `The legalization of same-sex marriage has occurred at different times across various countries and jurisdictions. Here's a timeline of some significant milestones:

Key Global Milestones:
- 2001: Netherlands becomes the first country to legalize same-sex marriage
- 2003: Belgium legalizes same-sex marriage
- 2005: Canada and Spain legalize same-sex marriage
- 2009: Norway and Sweden legalize same-sex marriage
- 2013: England and Wales legalize same-sex marriage
- 2015: United States legalizes same-sex marriage nationwide
- 2017: Australia legalizes same-sex marriage
- 2022: Slovenia legalizes same-sex marriage
- 2023: Greece legalizes same-sex marriage

United States Timeline:
- 2004: Massachusetts becomes the first U.S. state to legalize same-sex marriage
- 2008-2015: Various states individually legalize same-sex marriage
- June 26, 2015: The Supreme Court case Obergefell v. Hodges makes same-sex marriage legal nationwide

Current Status:
- As of 2024, same-sex marriage is legal in 34 countries
- Many countries still do not recognize same-sex marriage
- Some countries offer civil unions or registered partnerships instead
- The movement for marriage equality continues globally

The fight for marriage equality continues in many parts of the world, with ongoing efforts to secure equal rights for LGBTQ+ couples.`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "which ear is the gay ear?",
    content: `The concept of a "gay ear" refers to the idea that having a piercing in a specific ear might indicate someone's sexual orientation. Historically, in some Western cultures during the 1980s and early 1990s, it was believed that having an earring in the right ear was a subtle signal of being gay, while having one in the left ear was considered "straight."

However, this is largely considered an outdated and unreliable stereotype. The association between ear piercing and sexual orientation varies by culture and time period, and in modern society, ear piercings are generally viewed as a fashion choice rather than an indicator of sexual orientation.

Key points to understand:
- The "gay ear" stereotype emerged in the late 20th century
- Right ear was sometimes called the "gay ear"
- Left ear was sometimes called the "straight ear"
- This coding system was never universal or reliable
- Modern view: Ear piercing is simply a fashion choice
- The stereotype has largely fallen out of use in contemporary society

It's important to note that attempting to determine someone's sexual orientation based on physical appearance or fashion choices is not reliable and can perpetuate harmful stereotypes.`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  }
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
    
    // 清空现有的文章集合
    await db.collection("articles").deleteMany({});
    console.log('Cleared existing articles');

    // 插入预设文章
    const result = await db.collection("articles").insertMany(articles);
    console.log(`Inserted ${result.insertedCount} preset articles`);

    // 创建索引
    await db.collection("articles").createIndex({ type: 1 });
    await db.collection("articles").createIndex({ title: "text", content: "text" });
    await db.collection("articles").createIndex({ createdAt: -1 });
    await db.collection("articles").createIndex({ views: -1 });
    await db.collection("articles").createIndex({ likes: -1 });
    console.log('Created indexes');

    // 验证插入的数据
    const insertedArticles = await db.collection("articles").find({}).toArray();
    console.log('First inserted article:', {
      title: insertedArticles[0]?.title,
      type: insertedArticles[0]?.type
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

main();
