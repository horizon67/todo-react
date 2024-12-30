import useSWR, { mutate } from 'swr'
import { Task, TaskState } from '@/types'
import { ENV } from '@/lib/env'

const TASKS_KEY = '/api/tasks'

export function useTasks() {
  const { data: tasks = [], isLoading } = useSWR<Task[]>(TASKS_KEY, async () => {
    const response = await fetch(`${ENV.VITE_API_URL}/tasks`)
    return response.json()
  })

  const createTask = async (content: string) => {
    await fetch(`${ENV.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, state: TaskState.TODO }),
    })
    await mutate(TASKS_KEY)
  }

  const updateTaskState = async (task: Task) => {
    await fetch(`${ENV.VITE_API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...task, 
        state: task.state === TaskState.TODO ? TaskState.DONE : TaskState.TODO 
      }),
    })
    await mutate(TASKS_KEY)
  }

  const deleteTask = async (id: number) => {
    await fetch(`${ENV.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
    await mutate(TASKS_KEY)
  }

  return {
    tasks,
    isLoading,
    createTask,
    updateTaskState,
    deleteTask,
  }
}
