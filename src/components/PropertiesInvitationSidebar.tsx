import React from "react";
import useDesigner from "./hooks/useDesigner";
import { InvitationElements } from "./FormElements";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function PropertiesInvitationSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesInvitations =
    InvitationElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/70">Element properties</p>

        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <PropertiesInvitations elementInstance={selectedElement} />
    </div>
  );
}
