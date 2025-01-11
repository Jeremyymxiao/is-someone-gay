import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="hover:bg-white/20"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Questions
          </Button>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <Skeleton className="h-8 w-2/3" />
              <div className="flex space-x-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>

            <Skeleton className="mt-4 h-4 w-full" />
            
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
              
              <Skeleton className="h-8 w-full" />

              <div className="flex space-x-4 mt-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            
            <div className="space-y-4 mb-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-24" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="mt-2">
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-2">
                  <Skeleton className="h-4 w-48" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
