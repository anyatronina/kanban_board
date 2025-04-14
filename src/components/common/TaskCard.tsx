import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTask } from "../../store/taskSlice";
import dictionary from "../../data/dictionary.json";
import Badge from "../ui/Badge";
import colorsStatus from "../../data/colorsStatus.json";
import colorsPriority from "../../data/colorsPriority.json";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskProps } from "../../types/types";

interface TaskCardProps {
  color: string;
  task: TaskProps;
  isDragging?: boolean;
  isOverlay?: boolean;
}

type ColorType = {
  id: number;
  text: string;
  backgroundText: string;
};

const TaskCard: React.FC<TaskCardProps> = ({ color, task }) => {
  const {
    taskName,
    description,
    dueDate,
    id,
    assigneeId,
    statusId,
    priorityId,
  } = task;
  const { assignees, priorities, statuses } = dictionary;
  const dispatch = useDispatch();
  const badgeColor = colorsStatus[statusId];
  const priorityColor = priorityId !== null ? colorsPriority[priorityId] : "";
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  const style = {
    opacity: isDragging ? 0.3 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const transformDate = (date: string | null) => {
    return date ? date.slice(2).split("-").reverse().join("/") : "";
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
  };

  const getNameAssignee = (id: number) => {
    const [nameArr] = Object.entries(assignees).filter(
      ([idAssignee, name]) => String(id) === idAssignee
    );
    return nameArr[1];
  };

  const getStatusName = (id: number) => {
    const [status] = Object.entries(statuses).filter(
      ([idStatus, name]) => String(id) === idStatus
    );
    return status[1];
  };

  const getPriorityName = (id: number) => {
    const [priority] = Object.entries(priorities).filter(
      ([idPriority, name]) => String(id) === idPriority
    );
    return priority[1];
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <TaskCardStyled
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      color={color}
      onContextMenu={handleRightClick}
      isDragging={isDragging}
    >
      <Title color={taskName ? "black" : "rgba(143, 143, 143, 1)"}>
        <img src="./svgs/circle.svg" alt="" width={16} height={16} />
        <span>{taskName ? taskName : "Новая задача"}</span>
        <IconTrash
          onClick={handleDelete}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          src="./svgs/trash.svg"
          alt=""
          width={20}
          height={20}
        />
      </Title>

      {assigneeId && (
        <Info>
          <Name>
            <IconName>{getNameAssignee(assigneeId)[0]}</IconName>
            <span>{getNameAssignee(assigneeId)}</span>
          </Name>
          <span>•</span>
          <div>{transformDate(dueDate)}</div>
        </Info>
      )}

      <Badges>
        <Badge
          color={badgeColor.text}
          bgColor={badgeColor.backgroundText}
          text={getStatusName(statusId)}
          src={badgeColor.src}
        />
        {priorityId !== null && (
          <Badge
            color={(priorityColor as ColorType).text}
            bgColor={(priorityColor as ColorType).backgroundText}
            text={getPriorityName(priorityId)}
          />
        )}
      </Badges>

      {description && <Description>{description}</Description>}
    </TaskCardStyled>
  );
};

const TaskCardStyled = styled.div<{
  isDragging?: boolean;
  isOverlay?: boolean;
}>`
  opacity: ${({ isDragging }) => (isDragging ? "0" : "1 !important")};
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${({ color }) => color};
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  color: ${({ color }) => color};
  display: grid;
  grid-template-columns: min-content auto min-content;
  line-height: 20px;
  align-items: center;
  font-size: 16px;
  gap: 8px;
`;

const IconTrash = styled.img`
  align-self: flex-start;
  cursor: pointer;
`;

const Info = styled.div`
  font-size: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`;
const Badges = styled.div`
  display: flex;
  gap: 12px;
`;
const Description = styled.div`
  font-size: 14px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconName = styled.div`
  padding: 1px 4px;
  border-radius: 9999px;
  border: 0.5px solid rgba(19, 157, 142, 1);
  background: rgba(233, 251, 249, 1);
  color: rgba(10, 158, 142, 1);
`;

export default TaskCard;
