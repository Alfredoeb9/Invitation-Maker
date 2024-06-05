import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { InvitationElementsInstance } from "../FormElements";

type DesignerContextType = {
  elements: InvitationElementsInstance[];
  addElement: (index: number, element: InvitationElementsInstance) => void;
  removeElement: (id: string) => void;

  selectedElement: InvitationElementsInstance | null;
  setSelectedElement: Dispatch<
    SetStateAction<InvitationElementsInstance | null>
  >;

  updateElement: (id: string, element: InvitationElementsInstance) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<InvitationElementsInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<InvitationElementsInstance | null>(null);

  const addElement = (index: number, element: InvitationElementsInstance) => {
    setElements((prev) => {
      const newElements = [...prev];

      newElements.splice(index, 0, element);

      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((ele) => ele.id !== id));
  };

  const updateElement = (id: string, element: InvitationElementsInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((ele) => ele.id === id);

      newElements[index] = element;

      return newElements;
    });
  };

  return (
    <DesignerContext.Provider
      value={{
        elements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}
