import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}
