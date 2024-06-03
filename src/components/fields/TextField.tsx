import React from "react";
import { ElementsType, InvitationElement } from "../FormElements";
import { Type } from "lucide-react";

const type: ElementsType = "TextField";

export const TextFieldFormElements: InvitationElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here...",
    },
  }),
  designerButtonElement: {
    icon: Type,
    label: "Text Field",
  },
  designerComponent: () => <div>Designer component</div>,
  invitationComponent: () => <div>Invitation component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};
