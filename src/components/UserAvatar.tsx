import { User } from "next-auth";
import React from "react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";

type Props = {
  user: Pick<User, "name" | "image">;
};

export default function UserAvatar({ user }: Props) {
  return (
    <Avatar>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback></AvatarFallback>
      )}
    </Avatar>
  );
}
