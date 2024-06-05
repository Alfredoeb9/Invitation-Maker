import React from "react";
import { InvitationElements } from "./FormElements";
import SidebarButtonElements from "./SidebarButtonElements";
import useDesigner from "./hooks/useDesigner";

export default function InvitationElementsSidebar() {
  return (
    // <div>
    //   Elements
    <SidebarButtonElements invitaitonElement={InvitationElements.TextField} />
    // </div>
  );
}
