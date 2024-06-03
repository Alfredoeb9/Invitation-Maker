import React from "react";
import {
  ElementsType,
  InvitationElement,
  InvitationElementsInstance,
} from "../FormElements";
import { Type } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

export const TextFieldFormElements: InvitationElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerButtonElement: {
    icon: Type,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  invitationComponent: () => <div>Invitation component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};

type CustomInstance = InvitationElementsInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: InvitationElementsInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full ">
      <Label>
        {label}
        {required && "*"}
      </Label>

      <Input readOnly disabled placeholder={placeHolder} />

      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
