# Progress Report

## 2025-01-11

### 已完成功能

1. 从CSV文件中提取了20个名人名字，包括：
   - Billie Eilish
   - Hugh Jackman
   - Tyler the Creator
   - Frank Ocean
   - Harry Styles
   - Tony Hinchcliffe
   - Diddy
   - Eminem
   - John Travolta
   - Usher
   - Chappell Roan
   - David Muir
   - Erik Menendez
   - Lil Nas X
   - Lindsey Graham
   - P Diddy
   - Pedro Pascal
   - Will Smith
   - Caleb Williams
   - Conan Gray

2. 修改了前端展示
   - 在 `src/components/QuestionList.tsx` 中实现了名字列表的展示
   - 每个名字都有一个卡片，显示 "Is [Name] Gay?" 的问题
   - 添加了投票按钮（赞成/反对）和评论按钮
   - 实现了基本的前端投票状态管理

3. 数据库设计
   - 创建了数据库类型定义 (`src/types/db.ts`)
   - 设计了两种问题类型：预设问题(PresetQuestion)和用户问题(UserQuestion)
   - 问题结构包含：
     - 问题信息（名字/标题）
     - 投票数据（赞成/反对/IP列表）
     - 评论数据
     - 时间戳
   - 创建了数据库初始化脚本 (`scripts/init-db.ts`)
   - 设置了必要的数据库索引

4. 数据库初始化
   - 创建了数据库初始化脚本 (`scripts/init-db.js`)
   - 添加了npm脚本命令 `init-db`
   - 实现了以下功能：
     - 连接MongoDB数据库
     - 清空现有预设问题
     - 插入20个预设问题
     - 创建必要的索引
   - 解决的问题：
     - TypeScript执行问题：将.ts脚本改为.js
     - 添加了dotenv配置支持
     - 成功插入了所有预设问题

5. 文章初始化
   - 添加了文章功能
     - 在 `src/types/db.ts` 中定义了 `Article` 类型
     - 创建了19个预设文章，包括：
       - "Which ear is the gay ear"
       - "When was gay marriage legalized"
       - "When was gay marriage legalized in California"
       - "What does the Bible say about being gay"
       - "What does God say about being gay"
       - "Can you be gay and Christian"
       - "Is gay marriage legal in Japan"
       - "What does it mean to be gay"
       - "What percent of the population is gay"
       - "Do gays get stoned in Palestine"
       - "Does one piercing mean you're gay"
       - "Does Nick Parnets know he is gay"
       - "Does gay sex have shit smell"
       - "How do you tell your bestfriend they are gay"
       - "Was being gay in the army a dishonorable"
       - "What are the variables in Gay Lussac's law"
       - "What is the difference between queer and gay"
       - "Who made the word gay different meaning"
       - "Why is Taylor Swift so popular with the gays"
     - 创建了文章初始化脚本 (`scripts/init-articles.js`)
     - 添加了必要的数据库索引：
       - type索引：用于区分预设文章
       - title索引：用于文章搜索
       - views索引：用于热门文章排序
       - likes索引：用于点赞排序
       - createdAt索引：用于最新文章排序

6. API实现
   - 实现了文章API
     - 更新了文章列表API (`/api/articles/route.ts`)：
       - 支持按类型过滤（preset/user）
       - 支持多种排序方式（最新/最热/趋势）
       - 分页显示（每页20条）
     - 实现了单个文章API (`/api/articles/[id]/route.ts`)：
       - 获取文章详情
       - 自动增加浏览次数
     - 实现了文章点赞API (`/api/articles/[id]/like/route.ts`)：
       - 支持点赞/取消点赞
       - 使用IP地址防止重复点赞
       - 返回更新后的点赞数

7. 实现了文章详情页面
   - 创建了文章详情组件 (`src/components/ArticleDetail.tsx`)：
     - 显示文章标题、内容、浏览量和创建时间
     - 实现了点赞功能
     - 添加了加载状态和错误处理
   - 实现了文章详情页面 (`src/app/articles/[id]/page.tsx`)：
     - 服务端获取文章数据
     - 添加了404处理
     - 添加了加载状态
   - 添加了辅助页面：
     - 404页面 (`not-found.tsx`)
     - 加载状态页面 (`loading.tsx`)
   - UI组件：
     - 使用Card组件展示文章内容
     - 添加了点赞按钮
     - 显示浏览量和发布时间
     - 响应式设计，适配不同屏幕大小

8. **Layout and Navigation Improvements**
   - **Header Component Added**
     - Created a transparent header with backdrop blur effect
     - Added navigation buttons for Vote and Articles
     - Implemented dynamic home button (shows only on non-home pages)
     - Used semi-transparent design for modern look

   - **Footer Component Added**
     - Added copyright information
     - Implemented with backdrop blur effect
     - Maintained consistent design with header

   - **Root Layout Updates**
     - Switched from Inter to Quicksand font for a more playful look
     - Updated background gradient from pink to softer violet/sky tones
     - Implemented flex layout to ensure footer stays at bottom
     - Added global container structure

   - **Navigation Structure**
     - Created dedicated routes for articles and questions
     - Added back buttons for better navigation
     - Implemented consistent navigation patterns across pages

   - **Visual Design Improvements**
     - Updated main title with gradient text effect
     - Added "Discover, Vote, Share" tagline
     - Refined spacing and typography
     - Implemented glass-morphism design elements

### 待完成功能

1. 数据持久化
   - [x] 创建数据库表存储预设问题
   - [ ] 修改投票API以支持预设问题的投票
   - [ ] 实现前端投票数据的获取和更新

2. 评论功能
   - [ ] 为每个预设问题添加评论功能
   - [ ] 实现评论的展示和提交

3. 新增问题功能
   - [ ] 允许用户提交新的问题
   - [ ] 区分预设问题和用户提交的问题

4. 文章功能
   - [ ] 实现文章列表页面
   - [ ] 添加文章评论功能
   - [ ] 实现文章搜索功能
   - [ ] 添加相关文章推荐
   - [ ] 优化文章内容展示（支持Markdown等）

### Bug修复记录

1. MongoDB TypeScript类型问题修复
   - 问题：在 `src/app/api/questions/route.ts` 中，MongoDB的查询类型与TypeScript类型定义不匹配
   - 原因：
     - URL参数的type是string类型，而数据库中type字段必须是 'preset' | 'user' 字面量类型
     - MongoDB的Filter类型需要正确导入和使用
   - 解决方案：
     - 添加了type参数的类型检查，确保只有 'preset' 和 'user' 可以作为有效值
     - 正确导入并使用了MongoDB的Filter类型
     - 使用类型断言确保type参数符合预期类型
   - 修改文件：
     ```typescript
     // src/app/api/questions/route.ts
     import type { Filter } from 'mongodb';
     
     const query: Filter<PresetQuestion | UserQuestion> = 
       (type === 'preset' || type === 'user') ? { type: type as 'preset' | 'user' } : {};
     ```

2. 投票API类型问题修复
   - 问题：在 `src/app/api/questions/[id]/vote/route.ts` 中，MongoDB的$push操作类型错误
   - 原因：MongoDB的TypeScript类型对数组操作有特殊要求
   - 解决方案：
     - 将$push操作符改为$addToSet，更适合处理唯一IP地址的集合
     - 这样也避免了重复投票的问题

3. MongoDB ObjectId serialization in article APIs
   - 问题：在文章API中，MongoDB ObjectId序列化错误
   - 原因：ObjectId序列化需要正确处理
   - 解决方案：
     - 添加了ObjectId序列化处理
     - 确保正确序列化ObjectId

4. Next.js Route Handler 类型错误修复
   - 问题描述：在构建时遇到路由处理器的类型错误
     ```
     Type error: Route has an invalid "POST" export:
     Type "{ params: { id: string; }; }" is not a valid type for the function's second argument.
     ```
   
   - 解决方案：
     1. 将 Next.js 版本从 15.1.4 降级到 14.1.0（更稳定的版本）
     2. 移除了 `Request` 的显式导入（它是全局类型）
     3. 使用正确的路由处理器参数类型定义：
     ```typescript
     import { NextResponse } from 'next/server';
     
     export async function POST(
       request: Request,
       { params }: { params: { id: string } }
     ) {
       // ... 
     }
     ```
   
   - 注意事项：
     - Next.js 14.1.0 中 `Request` 是全局类型，不需要从 'next/server' 导入
     - 路由处理器的参数类型需要严格匹配 Next.js 的类型定义
     - 使用解构语法 `{ params }` 而不是自定义接口
   
   - 相关文件：
     - `/src/app/api/articles/[id]/like/route.ts`
     - `/src/app/api/questions/[id]/vote/route.ts`
     - `/src/app/api/questions/[id]/comments/route.ts`

### 下一步计划

1. 修改投票API
   - 更新投票路由以支持预设问题
   - 添加IP地址验证
   - 实现投票计数更新

2. 实现文章列表页面
   - [ ] 实现文章列表页面
   - [ ] 添加文章评论功能
   - [ ] 实现文章搜索功能
   - [ ] 添加相关文章推荐

3. 实现评论功能
   - [ ] 为每个预设问题添加评论功能
   - [ ] 实现评论的展示和提交

4. 实现新增问题功能
   - [ ] 允许用户提交新的问题
   - [ ] 区分预设问题和用户提交的问题

5. 实现文章搜索功能
   - [ ] 实现文章搜索功能
   - [ ] 添加相关文章推荐

### 最新更新记录

#### 2025-01-11

### Bug Fixes and Improvements

#### Type System and API Improvements
1. 统一了问题类型定义
   - 移除了 `PresetQuestion` 和 `UserQuestion` 的分离定义
   - 创建了统一的 `Question` 类型
   - 更新了问题和评论的字段结构

2. API 返回数据格式优化
   - 统一使用 `id` 而不是 `_id`
   - 所有日期字段转换为 ISO 字符串格式
   - 确保所有 MongoDB ObjectId 被正确序列化

3. 组件更新
   - 更新了 QuestionList 组件以匹配新的数据格式
   - 更新了 QuestionDetail 组件以使用新的类型定义
   - 添加了正确的类型检查和空值处理

4. 投票系统改进
   - 重构了投票 API 的实现
   - 改进了投票状态的存储结构
   - 添加了更好的错误处理

### Technical Details

#### 数据模型更新
```typescript
interface Question {
  _id: ObjectId
  title: string
  description?: string
  type: 'preset' | 'user'
  votes: {
    yes: number
    no: number
    votedIps: {
      ip: string
      vote: 'yes' | 'no'
    }[]
  }
  comments: Array<{
    _id: ObjectId
    text: string
    nickname: string
    createdAt: Date
    likes: number
    likedIps: string[]
  }>
  createdAt: Date
  updatedAt: Date
}
```

#### API 改进
1. 问题列表 API (`GET /api/questions`)
   - 添加了更好的错误处理
   - 统一了返回格式
   - 支持类型过滤

2. 投票 API (`POST /api/questions/[id]/vote`)
   - 使用 `findOneAndUpdate` 优化数据库操作
   - 改进了投票验证逻辑
   - 添加了详细的错误消息

### Next.js 15 Type Fixing Attempts

1. **Attempt 1: Using Custom Props Type**
   ```typescript
   type Props = {
     params: { id: string }
     searchParams: Record<string, string | string[] | undefined>
   }
   ```
   Error: Type 'Props' does not satisfy the constraint 'PageProps'

2. **Attempt 2: Using Interface with Promise**
   ```typescript
   type PageProps = {
     params: Promise<{ id: string }>
   }
   ```
   Error: Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'

3. **Attempt 3: Using Route Segment Config**
   ```typescript
   type RouteSegmentConfig = {
     params: {
       id: string;
     };
   };
   ```
   Error: Type 'RouteSegmentConfig' is not a valid type for the function's second argument

4. **Attempt 4: Using Inline Types**
   ```typescript
   export default async function ArticlePage({
     params,
   }: {
     params: { id: string }
   }) {
   ```
   Error: Type '{ params: { id: string; }; }' does not satisfy the constraint 'PageProps'

5. **Final Working Solution**
   ```typescript
   interface PageProps {
     params: {
       id: string
     }
   }
   ```
   This approach worked after removing the Promise-based params and metadata generation.

Key Learnings:
- Next.js 15 has stricter type requirements for page props
- The params object should not be wrapped in a Promise
- Keep the interface simple and match the exact structure Next.js expects

### Next Steps
1. 实现评论的点赞功能
2. 添加问题分享功能
3. 实现相关问题推荐算法
4. 添加用户认证系统
5. 改进前端错误处理和加载状态

## 数据库同步问题调试记录 (2025-01-11)

### 问题描述
在更新数据库内容时，发现虽然初始化脚本执行成功，但前端页面显示的内容没有更新。具体表现为：
1. 问题列表成功更新
2. 文章列表仍显示旧内容

### 问题原因
经过调查发现是由于数据库名称不一致导致的：
1. 初始化脚本使用了新的数据库名称 `kana-learning-dev`
2. 而 API 路由仍在使用旧的数据库名称 `issomeonegay`
3. 这导致前端通过 API 获取数据时，实际查询的是旧数据库

### 解决步骤
1. 检查并统一所有数据库相关文件中的数据库名称：
   - 初始化脚本 (`scripts/init-db.mjs`, `scripts/init-articles.mjs`)
   - API 路由 (`src/app/api/questions/route.ts`, `src/app/api/articles/route.ts`)
   - MongoDB 连接配置 (`src/lib/mongodb.ts`)

2. 在 API 路由中添加调试日志，以便追踪数据库操作：
   ```typescript
   console.log('Using database:', dbName);
   console.log('MongoDB query:', JSON.stringify(query));
   console.log('Found articles:', articles.length);
   ```

3. 改进错误处理，使错误信息更详细：
   ```typescript
   console.error('Error in get articles API:', e);
   return NextResponse.json({ 
     success: false,
     error: e instanceof Error ? e.message : 'Unknown error',
     errorDetails: e instanceof Error ? e.stack : undefined
   });
   ```

### 预防措施
1. 将数据库名称统一配置在环境变量中
2. 在修改数据库名称时，需要检查所有相关文件
3. 添加适当的日志记录，以便及时发现问题
4. 在进行数据库操作时，确保先验证插入的数据

### 相关文件
- `/scripts/init-db.mjs`
- `/scripts/init-articles.mjs`
- `/src/app/api/questions/route.ts`
- `/src/app/api/articles/route.ts`
- `/src/lib/mongodb.ts`
- `/.env.local`

### 注意事项
1. 修改数据库配置后需要重启开发服务器
2. 确保 MongoDB URI 中包含正确的数据库名称
3. 检查数据库连接和查询是否成功
4. 验证数据是否正确插入到目标集合中
