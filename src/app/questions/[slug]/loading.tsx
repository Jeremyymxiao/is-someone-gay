import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="pt-6">
          {/* Question Title */}
          <Skeleton className="h-8 w-3/4 mb-4" />
          
          {/* Question Stats */}
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          
          {/* Vote Section */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
          
          {/* Comments Section */}
          <div className="space-y-4 pt-8 border-t">
            <Skeleton className="h-6 w-32 mb-4" />
            {/* Comment Form */}
            <Skeleton className="h-24 w-full mb-8" />
            {/* Comments */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 