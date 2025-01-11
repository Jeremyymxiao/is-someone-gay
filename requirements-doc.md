# isSomeoneGay Website Requirements Document

## Project Overview
A website that allows users to create and vote on "isXXXgay" questions, share opinions, and read related articles. The platform aims to be lightweight and user-friendly, with no login required for basic interactions.

## Core Features

### 1. Voting System
- Create "isXXXgay" questions without registration
- Vote (Yes/No) on questions
- View voting statistics and percentages
- Basic anti-abuse measures using localStorage and IP tracking
- Detailed view for each question showing:
  - Vote distribution
  - Comments
  - Related questions
  - Sharing options

### 2. Discussion System
- Comment on questions without registration
- Required fields: nickname and comment content
- Support for liking comments
- Basic moderation through reporting feature
- Simple anti-spam measures

### 3. Article System
- Separate section for articles
- Article categories and tags
- Reading time estimates
- Author attribution
- Related questions linking

### 4. Search and Navigation
- Search across questions and articles
- Category-based browsing
- Related content suggestions
- Simple and intuitive UI

## Technical Requirements

### Frontend Stack
- Framework: Next.js 14+
- Styling: Tailwind CSS
- UI Components: 
  - shadcn/ui for base components
  - Lucide React for icons
  - Recharts for data visualization
- State Management: React hooks and context

### Backend Stack
- Next.js API routes
- MongoDB for data storage
- Basic rate limiting and IP tracking

### Infrastructure
- Deployment: Vercel
- Database: MongoDB Atlas (free tier initially)
- No authentication service required for MVP

## Data Models

### Question
```javascript
{
  id: ObjectId,
  title: String,        // e.g., "istaylorswiftgay"
  description: String,  // optional
  votes: {
    yes: Number,
    no: Number
  },
  comments: [{
    nickname: String,
    content: String,
    createdAt: Date,
    likes: Number,
    ipAddress: String
  }],
  createdAt: Date,
  ipAddress: String
}
```

### Article
```javascript
{
  id: ObjectId,
  title: String,
  content: String,
  excerpt: String,
  author: String,
  category: String,
  readTime: String,
  createdAt: Date,
  relatedQuestions: [ObjectId]
}
```

## Implementation Phases

### Phase 1: MVP
1. Basic question creation and voting
2. Simple comments system
3. Homepage with search
4. Question detail pages
5. Basic article system

### Phase 2: Enhancements
1. Advanced spam prevention
2. Improved moderation tools
3. Social sharing features
4. Article categories and tags
5. Analytics and trending content

## Anti-Abuse Measures
- IP-based vote limiting
- Local storage tracking for votes
- Basic spam detection for comments
- Report functionality for inappropriate content
- Rate limiting on API endpoints

## Performance Requirements
- Page load time < 3 seconds
- Mobile-responsive design
- Support for modern browsers
- Optimized for SEO

## Development Guidelines
- Use TypeScript for type safety
- Follow Airbnb JavaScript Style Guide
- Implement responsive design patterns
- Use semantic HTML
- Ensure accessibility compliance
- Document API endpoints using OpenAPI/Swagger

## Future Considerations
- User accounts (optional)
- OAuth integration
- Advanced analytics
- Content moderation dashboard
- API access for third parties

This document serves as a starting point for development and can be expanded based on additional requirements or technical constraints.