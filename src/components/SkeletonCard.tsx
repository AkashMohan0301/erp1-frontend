import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
return (
  <div className="min-h-screen flex items-center justify-center bg-muted/40">
    <Card className="w-[1100px] h-[650px] overflow-hidden">
      
      <div className="flex h-full">
        
        {/* Sidebar */}
        <aside className="w-64 border-r p-4 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-2/3" />
        </aside>

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <header className="border-b p-4 space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </main>

          {/* Footer */}
          <footer className="border-t p-4">
            <Skeleton className="h-4 w-1/4" />
          </footer>

        </div>
      </div>

    </Card>
  </div>
)
}
