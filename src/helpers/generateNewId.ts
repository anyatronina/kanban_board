import { TaskProps } from "../types/types";

export function generateNewId(tasks: TaskProps[]) {
  return Math.max(...tasks.map((task) => task.id)) + 1;
}
