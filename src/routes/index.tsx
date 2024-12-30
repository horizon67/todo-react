import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold mb-4">TODOアプリ</h1>
      <p>タスク一覧ページから操作を開始してください。</p>
    </div>
  ),
}) 
