# isSomeoneGay Website

A modern web application that allows users to create and vote on "isXXXgay" questions, share opinions, and read related articles.

## Features

- Create and vote on questions without registration
- Comment system with nickname support
- Article section with categories and tags
- Mobile-responsive design
- Real-time vote tracking
- Basic anti-abuse measures

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Deployment**: Vercel (recommended)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
- `/src/lib` - Utility functions and database client
- `/src/types` - TypeScript type definitions

## API Routes

- `GET /api/questions` - Get list of questions
- `POST /api/questions` - Create new question
- `POST /api/questions/[id]/vote` - Vote on a question
- `POST /api/questions/[id]/comments` - Add comment to question
- `GET /api/articles` - Get list of articles
- `POST /api/articles` - Create new article

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
