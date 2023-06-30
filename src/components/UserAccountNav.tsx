"use client";

import { User } from "next-auth";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

import { DropdownMenu } from "@/components/ui/DropdownMenu";
import UserAvatar from "@/components/UserAvatar";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

export default function UserAccountNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
