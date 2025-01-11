import QuestionList from '@/components/QuestionList'

export default function QuestionsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vote</h1>
      <QuestionList />
    </main>
  )
}
