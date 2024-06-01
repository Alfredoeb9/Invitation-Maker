import React from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

export default function SaveInvitationButton() {
  return (
    <Button className="gap-2">
      <Save className="h-6 w-6" /> Save
    </Button>
  );
}
