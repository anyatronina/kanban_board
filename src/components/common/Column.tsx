import React from "react";
import styled from "styled-components";
import Badge from "../ui/Badge";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import IconPlus from "../ui/IconPlus";
import { addTask, getTasksLength } from "../../store/taskSlice";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import InvisibleDropZone from "../ui/InvisibleDropZone";
import { TaskProps } from "../../types/types";

interface ColumnProps {
  id: number;
  col: {
    text: string;
    backgroundText: string;
    column: string;
    src: string;
  };
  tasks: TaskProps[];
  statuses: string[];
  activeTask: TaskProps | null;
}

const Column: React.FC<ColumnProps> = ({
  id,
  col,
  tasks,
  statuses,
  activeTask,
}) => {
  const { setNodeRef } = useDroppable({ id });
  const dispatch = useDispatch();
  const tasksLength = useSelector(getTasksLength);

  const handleAddTask = (i: number) => {
    const newTask = {
      id: tasksLength,
      taskName: "",
      description: "",
      assigneeId: null,
      dueDate: "",
      priorityId: null,
      statusId: i,
      order: tasksLength,
    };
    dispatch(addTask(newTask));
  };

  return (
    <ColumnStyled>
      <TitleStyled>
        <Badge
          color={col.text}
          bgColor={col.backgroundText}
          text={statuses[id]}
          src={col.src}
        />
        <BadgeNumber>{tasks.length}</BadgeNumber>
      </TitleStyled>

      <TasksList color={col.column} ref={setNodeRef}>
        <SortableContext
          id={String(id)}
          items={tasks.length > 0 ? tasks.map((t) => t.id) : [`empty-${id}`]}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <InvisibleDropZone id={`empty-${id}`} />
          ) : (
            tasks.map((task, i_task) => (
              <TaskCard key={task.id} color={col.backgroundText} task={task} />
            ))
          )}
        </SortableContext>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} color="blue" /> : null}
        </DragOverlay>
        <Button color={col.text} onClick={() => handleAddTask(id)}>
          <IconPlus />
          <span>Новая задача</span>
        </Button>
      </TasksList>
    </ColumnStyled>
  );
};

const ColumnStyled = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  overflow: hidden;
`;

const TitleStyled = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 20px;
`;

const BadgeNumber = styled.div`
  display: grid;
  grid-template-columns: min-content;
  align-items: center;
  border-radius: 9999px;
  background-color: transparent;
  padding: 4px 0;
`;

const TasksList = styled.div`
  background-color: ${({ color }) => color};
  padding: 12px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #dcd7d7 transparent;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`;

const Button = styled.button`
  font-size: 16px;
  height: 48px;
  cursor: pointer;
  background-color: transparent;
  border-radius: 12px;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Column;
