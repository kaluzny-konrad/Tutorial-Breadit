"use client";

import { useRef } from "react";
import UserAvatar from "./UserAvatar";
import { Comment, CommentVote, User } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import CommentVotes from "./CommentVotes";
import { Button } from "./ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

type ExtendComment = Comment & {
  votes: CommentVote[];
  author: User;
};

type Props = {
  comment: ExtendComment;
  votesSummary: number;
  currentVote?: CommentVote | undefined;
  postId: string;
};

export default function PostComment({
  comment,
  votesSummary,
  currentVote,
  postId,
}: Props) {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="w-6 h-6"
        />
        <div className="flex items-center gap-x-2 ml-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center">
        <CommentVotes
          commentId={comment.id}
          initialVotesSummary={votesSummary}
          initialVote={currentVote?.type}
        />

        <Button onClick={() => {}} variant="ghost" size={"xs"}>
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </Button>
      </div>
    </div>
  );
}
