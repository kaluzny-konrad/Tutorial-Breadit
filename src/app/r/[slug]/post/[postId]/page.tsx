import { Post, PostVote, User } from "@prisma/client";
import React from "react";

import { redis } from "@/lib/redit";
import { CachedPost } from "@/types/redis";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

type Props = {
  params: {
    postId: string;
  };
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function page({ params }: Props) {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: PostVote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div></div>
    </div>
  );
}
