import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link to="/" className="mr-4 hover:text-blue-500">
          ホーム
        </Link>
        <Link to="/tasks" className="hover:text-blue-500">
          タスク一覧
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
}) 
