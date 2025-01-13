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

5. Vercel 部署依赖冲突修复
   - 问题描述：Vercel 部署时报错，Next.js 与 React 版本不兼容
     ```
     npm error peer react@"^18.2.0" from next@14.1.0
     npm error Found: react@19.0.0
     ```
   
   - 解决方案：
     1. 将 React 和 React DOM 版本降级到与 Next.js 14.1.0 兼容的版本
     2. 在 package.json 中更新以下依赖：
     ```json
     {
       "dependencies": {
         "next": "14.1.0",
         "react": "^18.2.0",
         "react-dom": "^18.2.0"
       },
       "devDependencies": {
         "@types/react": "^18.0.15"
       }
     }
     ```
     3. 删除 node_modules 和 .next 目录
     4. 重新安装依赖并构建
   
   - 注意事项：
     - Next.js 14.1.0 需要 React 18.2.0 作为对等依赖
     - 确保 React 和 React DOM 版本匹配
     - @types/react 的版本也需要相应更新
   
   - 相关文件：
     - `package.json`

6. Vercel 环境变量配置
   - 问题描述：Vercel 部署时报错，缺少必要的环境变量
     ```
     Error: Invalid/Missing environment variable: "MONGODB_URI"
     ```
   
   - 解决方案：
     1. 在 Vercel 项目设置中添加环境变量：
        - 打开 Vercel 项目仪表板
        - 进入 Settings > Environment Variables
        - 添加以下变量：
          ```
          MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/issomeonegay
          ```
     2. 确保环境变量在所有环境中都可用：
        - Production
        - Preview
        - Development
   
   - 注意事项：
     - 不要在代码中直接硬编码数据库连接字符串
     - 确保 MongoDB URI 包含正确的数据库名称
     - 在本地开发时使用 .env.local 文件
     - 不要将 .env 文件提交到版本控制系统
   
   - 相关文件：
     - `src/lib/mongodb.ts`
     - `.env.local` (本地开发)
     - `.gitignore`

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

### Technical Debt
- 考虑将数据库名称移至环境变量
- 考虑添加数据验证层
- 考虑添加日志系统
- 考虑添加性能监控

## 2025-01-13

### Bug修复

1. 修复了文章详情页面不显示的问题
   - 问题：在Next.js的Server Component中使用`fetch`导致数据获取失败
   - 解决方案：
     - 移除了`getArticle`函数中使用`fetch`的方式
     - 改为直接使用MongoDB客户端获取和更新文章数据
     - 在服务器端完成数据序列化
   - 影响文件：
     - `src/app/articles/[id]/page.tsx`

2. 修复了文章列表显示不正确的问题
   - 问题：文章列表API返回的数据格式不正确
   - 解决方案：
     - 更新了文章列表API的序列化逻辑
     - 确保返回正确的数据格式
   - 影响文件：
     - `src/app/api/articles/route.ts`

3. 修复了评论功能不正常的问题
   - 问题：评论功能无法正常工作
   - 解决方案：
     - 更新了评论API的实现
     - 添加了正确的类型检查和空值处理
   - 影响文件：
     - `src/app/api/questions/[id]/comments/route.ts`

## 2025-01-13

### 数据库同步问题调试记录 (2025-01-11)

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

## 2025-01-13

### 文章系统改进

1. 文章内容格式化
   - 安装了 `react-markdown` 用于渲染 Markdown 内容
   - 安装了 `@tailwindcss/typography` 插件美化 Markdown 样式
   - 更新了 `ArticleDetail` 组件以支持 Markdown 渲染
   - 配置了 Tailwind Typography 插件

2. 文章内容管理重构
   - 创建了专门的 `src/content/articles` 目录存放文章文件
   - 将每篇文章拆分为独立的文件：
     - `.md` 文件存储文章内容
     - `.meta.json` 文件存储元数据
   - 创建了 `create-article-files.mjs` 脚本用于批量创建文章文件
   - 更新了 `init-articles.mjs` 脚本以从文件系统读取文章

3. 遇到的问题及解决方案
   - 问题：数据库名称不一致导致文章无法显示
     - 原因：API 路由和文章详情页使用了不同的数据库名
     - 解决：统一使用 "kana-learning" 作为数据库名
   - 问题：文章内容没有正确分段
     - 原因：缺少 Markdown 渲染支持
     - 解决：添加了 react-markdown 和 Tailwind Typography
   - 问题：文章管理不便
     - 原因：所有文章内容都在一个 JavaScript 文件中
     - 解决：将文章拆分为独立的 .md 和 .meta.json 文件

4. 改进点
   - 文章内容和元数据分离，更易于管理
   - 支持 Markdown 格式，提升内容可读性
   - 更好的版本控制支持
   - 更容易进行多人协作
   - 提升了代码的可维护性

5. 后续优化方向
   - 实现文章内容的按需加载
   - 添加文章缓存机制
   - 实现文章预览功能
   - 添加文章编辑界面
   - 完善文章的搜索和过滤功能

## 2025-01-13

### 添加文章评论功能

1. 实现评论功能的主要步骤：
   - 创建评论API路由 (`/api/articles/[id]/comments/route.ts`)
   - 创建评论组件 (`/components/Comments.tsx`)
   - 修改文章详情组件以集成评论功能
   - 更新数据库类型定义

2. 遇到的问题和解决方案：

   a. 类型不匹配问题一：评论ID类型不匹配
   ```typescript
   // 错误信息
   Type '{ _id: ObjectId; text: string; nickname: string; createdAt: Date; likes: number; }[]' 
   is not assignable to type 'Comment[]'
   ```
   解决方案：
   - 创建了专门的 `SerializedComment` 类型
   - 在传递评论数据时将 ObjectId 转换为字符串

   b. 类型不匹配问题二：日期类型不匹配
   ```typescript
   // 错误信息
   Type 'string' is not assignable to type 'Date & string'
   ```
   解决方案：
   - 更新了 `SerializedArticle` 类型定义
   - 确保所有日期字段在序列化后都是字符串类型
   - 在数据传递过程中正确处理日期转换

   c. MongoDB 更新操作类型问题
   ```typescript
   // 错误信息
   Type '{ comments: { $each: [...] }; }' is not assignable to type 'PushOperator<Document>'
   ```
   解决方案：
   - 导入并使用 MongoDB 的 `UpdateFilter` 类型
   - 正确指定数据库操作的类型参数
   - 简化了 `$push` 操作的实现

3. 最终实现的功能：
   - 用户可以在文章详情页查看所有评论
   - 用户可以使用昵称发表新评论
   - 评论实时显示在列表顶部
   - 评论显示发布时间和作者信息
   - 评论数据在前端和后端之间正确序列化

4. 技术要点：
   - 使用 TypeScript 确保类型安全
   - MongoDB 数据库操作的正确实现
   - 前端组件的状态管理
   - 日期和ID的序列化处理
   - API路由的错误处理

5. 代码质量改进：
   - 添加了清晰的类型定义
   - 实现了统一的错误处理
   - 保持了代码的模块化
   - 确保了数据流的一致性
   - 添加了必要的数据验证

6. 下一步计划：
   - 添加评论编辑功能
   - 实现评论点赞功能
   - 添加评论分页
   - 实现评论排序
   - 添加评论举报功能

## 2025-01-13

### 重构：移除 Slug 依赖

1. **类型定义更新**
   - 从 `Question` 和 `Article` 接口中移除了 `slug` 字段
   - 更新了 `SerializedArticle` 和 `SerializedQuestion` 类型定义
   - 统一使用 MongoDB 的 `_id` 作为标识符

2. **路由重构**
   - 将 `/articles/[slug]` 重命名为 `/articles/[id]`
   - 将 `/questions/[slug]` 重命名为 `/questions/[id]`
   - 更新了路由处理函数，使用 ID 而不是 slug 来查询数据

3. **API 更新**
   - 修改了文章和问题的 API 路由，移除了 slug 相关代码
   - 统一了 API 响应中的字段名称，使用 `_id` 而不是 `id`
   - 移除了 slug 生成逻辑

4. **组件更新**
   - 更新了 `ArticleList` 和 `QuestionList` 组件，使用 ID 生成链接
   - 修改了 `ArticleDetail` 和 `QuestionDetail` 组件，适应新的数据结构
   - 优化了列表布局，从矩阵式改为列表式

5. **初始化脚本**
   - 删除了 `add-slugs.mjs` 脚本
   - 更新了 `init-db.mjs` 脚本，移除了 slug 相关代码

### 遇到的问题和解决方案

1. **TypeScript 错误**
   - 问题：`Property 'id' does not exist on type 'SerializedQuestion'`
   - 原因：组件中仍在使用 `id` 而不是 `_id`
   - 解决方案：
     - 统一使用 `_id` 作为标识符，与 MongoDB 的默认字段名保持一致

2. **路由问题**
   - 问题：重命名路由文件夹后，详情页面无法访问
   - 解决方案：
     - 确保所有路由文件夹名称从 `[slug]` 改为 `[id]`，并更新相关组件中的链接

3. **数据序列化**
   - 问题：API 响应中的字段名称不一致
   - 解决方案：
     - 统一使用 `_id` 作为标识符，确保前端组件和 API 响应使用相同的字段名

### 下一步计划

1. 考虑添加错误边界处理
2. 优化加载状态的用户体验
3. 考虑添加缓存机制
4. 添加更多的用户反馈机制

### 技术要点
- 使用 TypeScript 确保类型安全
- MongoDB 数据库操作的正确实现
- 前端组件的状态管理
- 日期和ID的序列化处理
- API路由的错误处理

### 代码质量改进
- 添加了清晰的类型定义
- 实现了统一的错误处理
- 保持了代码的模块化
- 确保了数据流的一致性
- 添加了必要的数据验证

### 下一步计划
1. 实现评论的点赞功能
2. 添加问题分享功能
3. 实现相关问题推荐算法
4. 添加用户认证系统
5. 改进前端错误处理和加载状态

### 技术债务
- 考虑将数据库名称移至环境变量
- 考虑添加数据验证层
- 考虑添加日志系统
- 考虑添加性能监控
