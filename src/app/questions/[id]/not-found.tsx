import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Question Not Found</h2>
        <p className="text-gray-600 mb-8">
          The question you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/questions">
            Back to Questions
          </Link>
        </Button>
      </div>
    </main>
  )
}
