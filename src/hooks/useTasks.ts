import { useState, useCallback } from 'react'
import { Task, TaskState } from '@/types'
import { ENV } from '@/lib/env'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = useCallback(async () => {
    const response = await fetch(`${ENV.VITE_API_URL}/tasks`)
    const data = await response.json()
    setTasks(data)
  }, [])

  const createTask = async (content: string) => {
    await fetch(`${ENV.VITE_API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, state: TaskState.TODO }),
    })
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
  }

  const deleteTask = async (id: number) => {
    await fetch(`${ENV.VITE_API_URL}/tasks/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    tasks,
    fetchTasks,
    createTask,
    updateTaskState,
    deleteTask,
  }
}
