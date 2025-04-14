import { useSortable } from "@dnd-kit/sortable";
import React from "react";

interface InvisibleDropZoneProps {
  id: string;
}

const InvisibleDropZone: React.FC<InvisibleDropZoneProps> = ({ id }) => {
  const { setNodeRef } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        height: "1px",
        margin: "0",
        opacity: 0,
      }}
    />
  );
};

export default InvisibleDropZone;
