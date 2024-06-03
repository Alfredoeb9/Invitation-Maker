import React, { ReactNode, createContext, useState } from "react";
import { InvitationElementsInstance } from "../FormElements";

type DesignerContextType = {
  elements: InvitationElementsInstance[];
  addElement: (index: number, element: InvitationElementsInstance) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [elements, setElements] = useState<InvitationElementsInstance[]>([]);

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

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
