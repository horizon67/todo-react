import { createFileRoute } from '@tanstack/react-router'
import { TaskList } from '../../components/TaskList'
import { CreateTaskForm } from '../../components/CreateTaskForm'
import { useState } from 'react'

function TasksPage() {
  const [refresh, setRefresh] = useState(0)

  const handleRefresh = () => {
    setRefresh(prev => prev + 1)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">タスク一覧</h1>
      <div className="space-y-4">
        <CreateTaskForm onRefresh={handleRefresh} />
        <TaskList refresh={refresh} onRefresh={handleRefresh} />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/tasks/')({
  component: TasksPage
})
