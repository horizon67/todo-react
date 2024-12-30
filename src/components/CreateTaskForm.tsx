import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTasks } from '@/hooks/useTasks'

export function CreateTaskForm() {
  const [content, setContent] = useState('')
  const { createTask } = useTasks()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    await createTask(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="新しいタスクを入力..."
      />
      <Button type="submit">追加</Button>
    </form>
  )
}
