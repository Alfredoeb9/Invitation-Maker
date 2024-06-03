import React from "react";
import { TextFieldFormElements } from "./fields/TextField";
import { LucideProps } from "lucide-react";
export type ElementsType = "TextField";

export type InvitationElement = {
  type: ElementsType;

  construct: (id: string) => InvitationElementsInstance;

  designerButtonElement: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC;
  invitationComponent: React.FC;
  propertiesComponent: React.FC;
};

export type InvitationElementsInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type InvitationElementsType = {
  [key in ElementsType]: InvitationElement;
};

export const InvitationElements: InvitationElementsType = {
  TextField: TextFieldFormElements,
};
