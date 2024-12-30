export interface Task {
  id: number;
  content: string;
  state: TaskState;
  created_at: string;
  updated_at: string;
}

export enum TaskState {
  TODO = 0,
  DONE = 1,
}
