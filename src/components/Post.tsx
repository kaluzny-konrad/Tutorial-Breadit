import { Post, User, PostVote } from "@prisma/client";
import React from "react";

type Props = {
  subredditName: string;
  post: Post & {
    author: User;
    votes: PostVote[];
  };
};

export default function Post({ subredditName, post }: Props) {
  return (
    <div>
      <div>
        {/* TODO PostVotes */}
        <div>
          <div>
            {subredditName ? (
              <>
                <a href={`/r/${subredditName}`}>r/{subredditName}</a>
                <span>•</span>
              </>
            ) : null}
            <span>Posted by u/{post?.author?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
