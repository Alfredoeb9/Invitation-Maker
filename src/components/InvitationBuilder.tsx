import React from "react";
import PreviewDialogButton from "./PreviewDialogButton";
import SaveInvitationButton from "./SaveInvitationButton";
import PublishInvitationButton from "./PublishInvitation";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

function InvitationBuilder({ invitationData }: any) {
  const data = invitationData?.data[0];

  // using these should work on mobile devices
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // 300 ms
      tolerance: 5, // 5px
    },
  });

  const sensors = useSensors(mouseSensor, mouseSensor);
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Invitation:</span>
            {data?.name}
          </h2>

          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!data?.published && (
              <>
                <SaveInvitationButton />
                <PublishInvitationButton />
              </>
            )}
          </div>
        </nav>

        <div className="flex flex-grow items-center justify-center relative overflow-y-auto h-[200px]  bg-slate-600 ">
          <Designer />
        </div>
      </main>

      <DragOverlayWrapper />
    </DndContext>
  );
}

export default InvitationBuilder;
