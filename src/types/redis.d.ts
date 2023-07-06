import { VoteType } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  content: string;
  currentVote: VoteType | null;
  createdAt: Date;
};

export type CachedComment = {
  id: string;
  text: string;
  authorUsername: string;
  replyToId: string | null;
  currentVote: VoteType | null;
  createdAt: Date;
};
