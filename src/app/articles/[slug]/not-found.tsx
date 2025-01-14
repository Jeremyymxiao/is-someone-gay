import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
      <p className="text-gray-600 mb-8">
        The article you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/articles">Back to Articles</Link>
      </Button>
    </div>
  )
} 