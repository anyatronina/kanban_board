import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./createStore";
import { TaskProps } from "../types/types";

interface TasksState {
  tasks: TaskProps[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TaskProps[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<TaskProps>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask(state, action: PayloadAction<TaskProps>) {
      const { id, taskName, description } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.taskName = taskName;
        existingTask.description = description;
      }
    },
    moveTaskToColumn(
      state,
      action: PayloadAction<{
        taskId: number;
        newColumnId: number;
        newOrder: number;
      }>
    ) {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.statusId = Number(action.payload.newColumnId);
        task.order = Number(action.payload.newOrder);
      }
    },
    updateTaskOrder(
      state,
      action: PayloadAction<{ updatedTasks: TaskProps[] }>
    ) {
      for (const updated of action.payload.updatedTasks) {
        const task = state.tasks.find((t) => t.id === updated.id);
        if (task) {
          task.order = updated.order;
        }
      }
    },
    setTasksInColumn(
      state,
      action: PayloadAction<{ columnId: number; tasks: TaskProps[] }>
    ) {
      const tasks = state.tasks;
      const otherTasks = tasks.filter(
        (t) => t.statusId !== action.payload.columnId
      );
      const newTasks = action.payload.tasks.map((t) => ({ ...t }));
      state.tasks = [...otherTasks, ...newTasks];
    },
  },
});

export const {
  setTasks,
  addTask,
  deleteTask,
  editTask,
  moveTaskToColumn,
  updateTaskOrder,
  setTasksInColumn,
} = tasksSlice.actions;

export const getAllTasks = (state: RootState) => state.tasks.tasks;
export const getTasksLength = (state: RootState) => state.tasks.tasks.length;

export default tasksSlice;
