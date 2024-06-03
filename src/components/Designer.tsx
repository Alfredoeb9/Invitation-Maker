import React, { useState } from "react";
import DesignerSidebar from "./DesignerSidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "./lib/utils";
import {
  ElementsType,
  InvitationElements,
  InvitationElementsInstance,
} from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { idGenerator } from "./lib/idGenerator";

export default function Designer() {
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerButtonElement =
        active?.data?.current?.isDesignerButtonElement;

      if (isDesignerButtonElement) {
        const type = active?.data?.current?.type;

        const newElement = InvitationElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0, newElement);
      }
    },
  });
  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-black max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-white"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}

          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}

function DesignerElementWrapper({
  element,
}: {
  element: InvitationElementsInstance;
}) {
  const DesignerElement = InvitationElements[element.type].designerComponent;

  return <DesignerElement />;
}
