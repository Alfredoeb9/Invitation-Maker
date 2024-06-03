import React from "react";
import { InvitationElements } from "./FormElements";
import SidebarButtonElements from "./SidebarButtonElements";

export default function DesignerSidebar() {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 broder-l-2 border-muted p-4 bg-black overflow-y-auto h-full">
      Elements
      <SidebarButtonElements invitaitonElement={InvitationElements.TextField} />
    </aside>
  );
}
