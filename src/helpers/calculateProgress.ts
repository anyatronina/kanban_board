import { TaskProps } from "../types/types";

export function calculateProgress(tasks: TaskProps[]) {
  const completedTasks = tasks.filter((task) => task.statusId === 3);
  const procent = Math.round((completedTasks.length / tasks.length) * 100);

  return procent;
}
