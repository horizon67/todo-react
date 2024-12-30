import { Task, TaskState } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { ENV } from '@/lib/env'
interface TaskItemProps {
  task: Task
  onRefresh: () => void
}

export function TaskItem({ task, onRefresh }: TaskItemProps) {
  const toggleState = async () => {
    await fetch(`${ENV.VITE_API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: task.content,
        state: task.state === TaskState.TODO ? TaskState.DONE : TaskState.TODO,
      }),
    })
    onRefresh()
  }

  const deleteTask = async () => {
    await fetch(`${ENV.VITE_API_URL}/tasks/${task.id}`, {
      method: 'DELETE',
    })
    onRefresh()
  }

  return (
    <div className="flex items-center space-x-2 p-2 border rounded">
      <Checkbox 
        checked={task.state === TaskState.DONE}
        onCheckedChange={toggleState}
      />
      <span className={task.state === TaskState.DONE ? 'line-through' : ''}>
        {task.content}
      </span>
      <Button variant="destructive" size="sm" onClick={deleteTask}>
        削除
      </Button>
    </div>
  )
}
