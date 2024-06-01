import React from "react";
import { Button } from "./ui/button";
import { BookOpenCheck } from "lucide-react";

export default function PublishInvitationButton() {
  return (
    <Button className="gap-2">
      <BookOpenCheck className="h-6 w-6" /> Publish
    </Button>
  );
}
