import { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'
import { Task, TaskState } from '@/types'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { DateTime } from 'luxon';
import { useTasks } from '@/hooks/useTasks'

const columns = (handleComplete: (task: Task) => void, handleDelete: (id: number) => void): ColumnDef<Task>[] => [
  {
    accessorKey: 'content',
    header: 'タスク内容',
  },
  {
    accessorKey: 'created_at',
    header: '作成日',
    cell: ({ row }) => {
      const utcDate = DateTime.fromISO(row.getValue('created_at'), { zone: 'UTC' })
        .setZone('Asia/Tokyo');
      return utcDate.toFormat('yyyy/MM/dd HH:mm');
    }
  },
  {

    accessorKey: 'updated_at',
    header: '更新日',
    cell: ({ row }) => {
      const utcDate = DateTime.fromISO(row.getValue('updated_at'), { zone: 'UTC' })
        .setZone('Asia/Tokyo');
      return utcDate.toFormat('yyyy/MM/dd HH:mm');
    }
  },
  {
    accessorKey: 'state',
    header: 'ステータス',
    cell: ({ row }) => (
      <div>{row.getValue('state') === TaskState.DONE ? '完了' : '未完了'}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original
      return (
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => handleComplete(task)}
          >
            {task.state === TaskState.DONE ? '未完了に戻す' : '完了にする'}
          </Button>
          <Button 
            variant="destructive"
            onClick={() => handleDelete(task.id)}
          >
            削除
          </Button>
        </div>
      )
    },
  },
]

export function TaskList({ refresh, onRefresh }: { refresh?: number, onRefresh: () => void }) {
  const { tasks, fetchTasks, updateTaskState, deleteTask } = useTasks()

  useEffect(() => {
    fetchTasks()
  }, [refresh, fetchTasks])

  const handleComplete = async (task: Task) => {
    await updateTaskState(task)
    onRefresh()
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    onRefresh()
  }

  const table = useReactTable({
    data: tasks,
    columns: columns(handleComplete, handleDelete),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tasks.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns(handleComplete, handleDelete).length}
                  className="h-24 text-center"
                >
                  タスクがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 
