export type PhaseId =
  | "onboarding"
  | "planning"
  | "travel"
  | "shopping"
  | "ordering"
  | "production"
  | "deliver"
  | "installation";

export type PhaseStatus = "completed" | "in-progress" | "pending" | "locked";

export type TaskStatus = "completed" | "in-progress" | "pending";

export interface Subtask {
  id: string;
  name: string;
  status: TaskStatus;
  completedDate?: string;
}

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  completedDate?: string;
  subtasks?: Subtask[];
}

export interface Phase {
  id: PhaseId;
  number: number;
  title: string;
  status: PhaseStatus;
  progress: number;
  tasks: Task[];
  poc?: { name: string; role: string; phone: string; email?: string };
  meetings?: number;
  messages?: number;
  documents?: { name: string; size?: string }[];
}
