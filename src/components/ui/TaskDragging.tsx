import React from "react";
import styled from "styled-components";
import { TaskProps } from "../../types/types";

interface TaskDraggingProps {
  task: TaskProps;
}

const TaskDragging: React.FC<TaskDraggingProps> = ({ task }) => {
  return <TaskDraggingStyled>TaskDragging</TaskDraggingStyled>;
};

const TaskDraggingStyled = styled.div`
  background-color: #f3efef;
  padding: 16px;
  border-radius: 16px;
  border: none;
  opacity: 0.5;
  /* cursor: pointer; */
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

export default TaskDragging;
