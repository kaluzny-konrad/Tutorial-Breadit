import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redit";
import { CommentVoteValidator } from "@/lib/validators/vote";
import { CachedComment } from "@/types/redis";
import { z } from "zod";

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { commentId, voteType } = CommentVoteValidator.parse(body);

    const existingVote = await db.commentVote.findFirst({
      where: { commentId, userId: session.user.id },
    });

    const comment = await db.comment.findUnique({
      where: { id: commentId },
      include: { votes: true, author: true },
    });

    if (!comment) return new Response("Comment not found", { status: 404 });

    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.commentVote.delete({
          where: {
            commentId_userId: {
              commentId,
              userId: session.user.id,
            },
          },
        });

        return new Response("Vote removed", { status: 200 });
      } else {
        await db.commentVote.update({
          where: { commentId_userId: { commentId, userId: session.user.id } },
          data: { type: voteType },
        });
      }
      const votesSummary = comment.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;
        return acc;
      }, 0);

      //   if (votesSummary > CACHE_AFTER_UPVOTES) {
      //     const cachePayload: CachedComment = {
      //       id: comment.id,
      //       text: comment.text,
      //       authorUsername: comment.author.username ?? "",
      //       currentVote: voteType,
      //       createdAt: comment.createdAt,
      //       replyToId: comment.replyToId,
      //     };

      //     await redis.hset(`comment:${comment.id}`, cachePayload);
      //   }

      return new Response("Vote updated", { status: 200 });
    }

    await db.commentVote.create({
      data: {
        type: voteType,
        commentId: commentId,
        userId: session.user.id,
      },
    });

    const votesSummary = comment.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    // if (votesSummary > CACHE_AFTER_UPVOTES) {
    //   const cachePayload: CachedComment = {
    //     id: comment.id,
    //     text: comment.text,
    //     authorUsername: comment.author.username ?? "",
    //     currentVote: voteType,
    //     createdAt: comment.createdAt,
    //     replyToId: comment.replyToId,
    //   };

    //   await redis.hset(`comment:${comment.id}`, cachePayload);
    // }

    return new Response("Vote created", { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response("Inavlid request data passed", { status: 422 });

    return new Response(
      "Could not register your vote, please try again later",
      {
        status: 500,
      }
    );
  }
}
