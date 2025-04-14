export type TaskProps = {
  id: number;
  taskName: string | null;
  description: string | null;
  assigneeId: number | null;
  dueDate: string | null;
  priorityId: number | null;
  statusId: number;
  order: number;
};

export interface BadgeProps {
  color: string;
  bgColor: string;
  text: string;
  src?: string;
}
