import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const articles = [
  {
    title: "Which Ear Is The Gay Ear?",
    content: `# The Gay Ear: Myth, History, and Modern Reality

If you've ever wondered about the "gay ear" myth, you're not alone. This fascinating piece of cultural history dates back to the 1980s and early 1990s when ear piercings were used as subtle signals in the LGBTQ+ community. But what's the real story behind this popular urban legend?

## The Historical Context

Back in the day, there was this widely spread belief that having your right ear pierced meant you were gay, while a left ear piercing indicated you were straight. People would often say "left is right, right is wrong" or "right is gay, left is straight" as a way to remember this unofficial code. This cultural phenomenon was particularly strong in Western countries during the late 20th century.

## Understanding the Code

The origin of this coding system actually makes a lot of sense when you consider the historical context. During times when being openly LGBTQ+ wasn't as accepted as it is today, people in the community often relied on subtle signals to identify each other. These signals, known as "coding," included various fashion choices, and ear piercings became one of these subtle indicators.

## Regional Variations

However, it's essential to understand that this was never a universal rule. The meaning of ear piercings varied significantly depending on where you lived and what time period you're talking about. In some places, the meanings were completely reversed, while in others, this concept didn't exist at all.

## Modern Perspective

Fast forward to today, and the whole idea of a "gay ear" seems pretty outdated. Modern fashion has completely moved past these old stereotypes. Now, people get their ears pierced wherever they want, with whatever style they prefer, regardless of their sexual orientation. Multiple piercings, industrial bars, cartilage piercings - they're all just expressions of personal style rather than signals of identity.

## Cultural Evolution

The evolution of this cultural phenomenon really shows how far society has come in terms of LGBTQ+ acceptance. What was once a necessary code has become an interesting piece of cultural history. These days, you're more likely to choose your piercing based on what looks good with your ear shape or what matches your aesthetic rather than any kind of social signaling.

## Making Your Choice

So, if you're thinking about getting your ear pierced, don't worry about old stereotypes. Pick the side that feels right for you. After all, the only real meaning behind an ear piercing today is the one you choose to give it. Whether it's your right ear, left ear, or both, what matters is that you're expressing yourself in a way that makes you feel confident and authentic.

## Conclusion

Remember, fashion choices and personal style are just that - personal. They don't define your sexual orientation or identity. The "gay ear" myth is now just an interesting reminder of how far we've come in creating a more accepting and open society where such coding isn't necessary anymore.`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "When Was Gay Marriage Legalized?",
    content: `The legalization of same-sex marriage has occurred at different times across various countries and jurisdictions. Here's a timeline of key events:

Global Timeline:
- 2001: Netherlands (first country)
- 2003: Belgium
- 2005: Spain and Canada
- 2013: France and New Zealand
- 2015: United States (nationwide)
- 2017: Australia
- 2022: Slovenia

United States Timeline:
- 2004: Massachusetts (first state)
- 2008: California (temporarily)
- 2015: Nationwide (Obergefell v. Hodges)

Current Status:
- Legal in 30+ countries worldwide
- Ongoing advocacy in many nations
- Continued expansion of rights`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "When Was Gay Marriage Legalized In California?",
    content: `The history of same-sex marriage in California has been complex with several legal changes. Here's the timeline:

Key Events:
- 2004: San Francisco begins issuing licenses
- 2008: California Supreme Court legalizes (May)
- 2008: Proposition 8 bans same-sex marriage (November)
- 2013: Proposition 8 struck down
- 2015: Nationwide legalization

Legal Battles:
- In re Marriage Cases (2008)
- Proposition 8 campaign
- Perry v. Schwarzenegger
- Supreme Court decisions

Current Status:
- Fully legal since 2013
- Equal rights and protections
- Recognition of out-of-state marriages`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Does The Bible Say About Being Gay?",
    content: `The Bible's stance on homosexuality is a topic of ongoing theological debate. Here's an overview of different interpretations:

Traditional Interpretation:
- Cites specific passages
- Views as prohibited
- Emphasizes traditional marriage

Progressive Interpretation:
- Considers historical context
- Focuses on love and acceptance
- Different translation perspectives

Key Passages Discussed:
- Leviticus 18:22
- Romans 1:26-27
- 1 Corinthians 6:9
- Genesis 19

Modern Understanding:
- Various denominational views
- Cultural context important
- Focus on overall message`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Does God Say About Being Gay?",
    content: `Religious perspectives on what God says about being gay vary widely across different faiths and interpretations:

Different Viewpoints:
- Traditional religious views
- Progressive interpretations
- Modern theological perspectives

Key Themes:
- Divine love and acceptance
- Religious texts interpretation
- Cultural context
- Modern understanding

Religious Responses:
- Varying denominational stances
- Evolving interpretations
- Focus on compassion
- Individual faith journeys`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Can You Be Gay And Christian?",
    content: `The relationship between being gay and Christian is a topic of ongoing discussion within religious communities:

Different Perspectives:
- Affirming churches
- Traditional views
- Middle ground approaches

Personal Faith:
- Individual journeys
- Support resources
- Community importance
- Spiritual growth

Modern Context:
- Changing attitudes
- Inclusive communities
- Theological discussion
- Personal faith expression`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Is Gay Marriage Legal In Japan?",
    content: `The status of same-sex marriage in Japan has unique characteristics:

Current Status:
- Not legally recognized nationwide
- Some municipalities offer partnerships
- Ongoing legal challenges
- Public opinion shifting

Legal Framework:
- Constitutional interpretation
- Local partnership certificates
- Rights and limitations
- International recognition

Future Prospects:
- Growing support
- Legal developments
- Advocacy efforts
- Social change`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Does It Mean To Be Gay?",
    content: `Being gay refers to sexual orientation and identity:

Definition:
- Same-sex attraction
- Personal identity
- Emotional connection
- Relationship preferences

Components:
- Sexual orientation
- Romantic attraction
- Identity expression
- Personal experience

Modern Understanding:
- Scientific perspective
- Social context
- Individual variation
- Identity spectrum`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Percent Of The Population Is Gay?",
    content: `Statistical data on LGBTQ+ demographics varies by study and region:

Global Statistics:
- Varying estimates
- Research challenges
- Regional differences
- Reporting factors

Research Findings:
- Different studies
- Methodology impact
- Self-reporting issues
- Cultural influences

Modern Trends:
- Increasing openness
- Generation differences
- Cultural changes
- Data collection methods`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Do Gays Get Stoned In Palestine?",
    content: `The treatment of LGBTQ+ individuals in Palestine is a complex issue:

Legal Status:
- Varying regional laws
- Social attitudes
- Safety concerns
- Human rights issues

Cultural Context:
- Traditional values
- Modern perspectives
- Social challenges
- Support networks

Current Situation:
- Legal framework
- Social acceptance
- Safety considerations
- Available resources`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Does One Piercing Mean You're Gay?",
    content: `Ear piercing and sexual orientation stereotypes:

Historical Context:
- Cultural myths
- Fashion history
- Changing perceptions
- Modern views

Reality:
- No correlation
- Personal choice
- Fashion trends
- Cultural differences

Modern Perspective:
- Style choices
- Self-expression
- Cultural shifts
- Individual meaning`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Does Nick Parnets Know He Is Gay?",
    content: `Discussion about speculation regarding personal orientation:

Privacy Considerations:
- Personal matter
- Respect boundaries
- Avoid assumptions
- Individual journey

Social Impact:
- Media speculation
- Public figures
- Privacy rights
- Responsible discussion

General Guidelines:
- Respect privacy
- Avoid stereotypes
- Personal choice
- Support inclusion`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Does Gay Sex Have Shit Smell?",
    content: `Sexual health and hygiene information:

Health Facts:
- Personal hygiene
- Safe practices
- Health considerations
- Medical information

Education:
- Health awareness
- Safe practices
- Medical facts
- Professional advice

Resources:
- Healthcare providers
- Educational materials
- Medical research
- Professional guidance`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "How Do You Tell Your Bestfriend They Are Gay?",
    content: `Supporting friends in their personal journey:

Important Points:
- Personal journey
- Respect boundaries
- Supportive approach
- Individual timing

Best Practices:
- Open communication
- Emotional support
- Respect privacy
- Available resources

Support Guidelines:
- Listen actively
- Show acceptance
- Offer support
- Respect choices`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Was Being Gay In The Army A Dishonorable?",
    content: `Historical and current military policies regarding LGBTQ+ service:

Historical Context:
- Don't Ask Don't Tell
- Policy changes
- Service impact
- Legal developments

Current Status:
- Modern policies
- Equal rights
- Service opportunities
- Support systems

Policy Evolution:
- Historical bans
- Policy changes
- Current inclusion
- Future direction`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Are The Variables In Gay Lussac's Law?",
    content: `Understanding Gay-Lussac's Law in chemistry:

Key Components:
- Pressure
- Temperature
- Volume relationships
- Gas behavior

Mathematical Expression:
- Formula explanation
- Variable definitions
- Applications
- Calculations

Practical Applications:
- Laboratory use
- Industrial processes
- Real-world examples
- Problem solving`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "What Is The Difference Between Queer And Gay?",
    content: `Understanding LGBTQ+ terminology and identities:

Definitions:
- Gay specifics
- Queer umbrella
- Historical context
- Modern usage

Identity Aspects:
- Sexual orientation
- Gender identity
- Personal expression
- Community context

Modern Understanding:
- Evolving terms
- Individual meaning
- Community usage
- Cultural context`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Who Made The Word Gay Different Meaning?",
    content: `The evolution of the word "gay" in language:

Historical Evolution:
- Original meaning
- Language changes
- Cultural shifts
- Modern usage

Timeline:
- Etymology
- Meaning changes
- Cultural impact
- Contemporary use

Language Development:
- Word history
- Social changes
- Cultural context
- Modern definition`,
    type: 'preset',
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Why Is Taylor Swift So Popular With The Gays?",
    content: `Exploring Taylor Swift's connection with LGBTQ+ fans:

Fan Connection:
- Advocacy work
- Musical appeal
- Cultural impact
- Community support

Cultural Impact:
- LGBTQ+ support
- Artistic expression
- Fan community
- Social influence

Artist Engagement:
- Public support
- Musical themes
- Fan interaction
- Cultural significance`,
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
    
    const dbName = "kana-learning"; 
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
