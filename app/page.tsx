import AvatarCustomizer from "@/components/avatar-customizer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">Ezterminator Avatar Customizer</h1>
        <AvatarCustomizer />
      </div>
    </main>
  )
}

