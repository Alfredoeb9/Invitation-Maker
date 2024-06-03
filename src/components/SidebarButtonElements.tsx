import React from "react";
import { InvitationElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "./lib/utils";

export default function SidebarButtonElements({
  invitaitonElement,
}: {
  invitaitonElement: InvitationElement;
}) {
  const { label, icon: Icon } = invitaitonElement.designerButtonElement;
  const draggable = useDraggable({
    id: `designer-btn-${invitaitonElement.type}`,
    data: {
      type: invitaitonElement.type,
      isDesignerButtonElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex flex-col gap-2 h-[120px] w-[120px] cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs text-black">{label}</p>
    </Button>
  );
}

export function SidebarButtonElementsDragOverlay({
  invitaitonElement,
}: {
  invitaitonElement: InvitationElement;
}) {
  const { label, icon: Icon } = invitaitonElement.designerButtonElement;

  return (
    <Button
      variant={"outline"}
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs text-black">{label}</p>
    </Button>
  );
}
