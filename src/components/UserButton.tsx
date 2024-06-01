import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAppDispatch } from "../redux/hooks";
import { userLogout } from "../redux/features/userSlice";
import { makeStore, store } from "../redux/store";

export default function UserButton() {
  const dispatch = useAppDispatch();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar onClick={() => console.log("testing")}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              dispatch(userLogout());
              dispatch({ type: "REST" });
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
