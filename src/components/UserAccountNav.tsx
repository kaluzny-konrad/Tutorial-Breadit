"use client";

import { User } from "next-auth";
import { DropdownMenu } from "./ui/DropdownMenu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

export default function UserAccountNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Image
          src={user.image!}
          alt={user.name!}
          width={32}
          height={32}
          className="rounded-full"
        />
        <p className="text-sm font-medium text-zinc-700">{user.name}</p>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
