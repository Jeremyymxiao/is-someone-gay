import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionList from "@/components/QuestionList"
import ArticleList from "@/components/ArticleList"
import SearchBar from "@/components/SearchBar"

export default function Home() {
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Is Someone Gay?
        </h1>
        <p className="text-xl text-center mb-8 text-gray-600">
          Discover, Vote, Share
        </p>

        <div className="glass-panel p-6 mb-8">
          <SearchBar className="mb-8" />

          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="articles">Articles</TabsTrigger>
            </TabsList>
            <TabsContent value="questions">
              <QuestionList />
            </TabsContent>
            <TabsContent value="articles">
              <ArticleList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
