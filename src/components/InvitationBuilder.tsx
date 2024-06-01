import React from "react";
import PreviewDialogButton from "./PreviewDialogButton";
import SaveInvitationButton from "./SaveInvitationButton";
import PublishInvitationButton from "./PublishInvitation";

function InvitationBuilder({ invitationData }: any) {
  const data = invitationData?.data[0];
  return (
    <main className="flex flex-col w-full">
      <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">Invitation:</span>
          {data?.name}
        </h2>

        <div className="flex items-center gap-2">
          <PreviewDialogButton />
          {!data?.published && (
            <>
              <SaveInvitationButton />
              <PublishInvitationButton />
            </>
          )}
        </div>
      </nav>

      <div className="flex-grow bg-slate-600 ">help me</div>
    </main>
  );
}

export default InvitationBuilder;
