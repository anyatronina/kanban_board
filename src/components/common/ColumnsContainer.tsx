import React, { useState } from "react";
import styled from "styled-components";
import dictionary from "../../data/dictionary.json";
import { useSelector } from "react-redux";
import {
  getAllTasks,
  moveTaskToColumn,
  updateTaskOrder,
} from "../../store/taskSlice";
import { useDispatch } from "react-redux";
import colors from "../../data/colorsStatus.json";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskProps } from "../../types/types";

const ColumnsContainer: React.FC = () => {
  const tasks = useSelector(getAllTasks);
  const dispatch = useDispatch();

  const statuses = Object.values(dictionary.statuses);

  const getFilteredTasks = (i: number) => {
    return tasks
      .filter((task) => task.statusId === i)
      .sort((a, b) => a.order - b.order);
  };

  const [activeTask, setActiveTask] = useState<TaskProps | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id;
    const task = tasks.find((t) => t.id === taskId);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over || active.id === over.id) {
      setActiveTask(null);
      return;
    }

    if (over.id.toString().startsWith("empty-")) {
      const toColumnId = over.id.toString().replace("empty-", "");

      dispatch(
        moveTaskToColumn({
          taskId: Number(active.id),
          newColumnId: Number(toColumnId),
          newOrder: 0,
        })
      );

      setActiveTask(null);
      return;
    }

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask || !overTask) {
      setActiveTask(null);
      return;
    }

    const fromColumn = activeTask.statusId;
    const toColumn = overTask.statusId;

    if (fromColumn === toColumn) {
      const columnTasks = getFilteredTasks(fromColumn);
      const oldIndex = columnTasks.findIndex((t) => t.id === active.id);
      const newIndex = columnTasks.findIndex((t) => t.id === over.id);
      const reordered = arrayMove(columnTasks, oldIndex, newIndex);

      const updatedTasks = reordered.map((task, index) => ({
        ...task,
        order: index,
      }));

      dispatch(updateTaskOrder({ updatedTasks }));
    } else {
      const targetColumnTasks = getFilteredTasks(toColumn);
      const newIndex = targetColumnTasks.findIndex((t) => t.id === over.id);

      dispatch(
        moveTaskToColumn({
          taskId: Number(active.id),
          newColumnId: toColumn,
          newOrder: newIndex,
        })
      );
    }

    setActiveTask(null);
  };

  return (
    <ColumnsContainerStyled>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {colors.map((col, i) => (
          <Column
            key={i}
            id={i}
            col={col}
            tasks={getFilteredTasks(i)}
            statuses={statuses}
            activeTask={activeTask}
          />
        ))}
      </DndContext>
    </ColumnsContainerStyled>
  );
};

const ColumnsContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  height: 100%;
`;

export default ColumnsContainer;
