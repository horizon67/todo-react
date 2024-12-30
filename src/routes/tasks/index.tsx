import { createFileRoute } from '@tanstack/react-router'
import { CreateTaskForm } from '@/components/CreateTaskForm'
import { TaskList } from '@/components/TaskList'

export function TasksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <div className="space-y-4">
        <CreateTaskForm />
        <TaskList />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/tasks/')({
  component: TasksPage
})
