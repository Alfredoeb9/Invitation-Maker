import React from "react";
import { Button } from "./ui/button";
import { ScanSearch } from "lucide-react";

export default function PreviewDialogButton() {
  return (
    <Button className="gap-2">
      <ScanSearch className="h-6 w-6" /> Preview
    </Button>
  );
}
