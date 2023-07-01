import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import MiniCreatePost from "@/components/MiniCreatePost";

type Props = {
  params: {
    slug: string;
  };
};

export default async function page({ params }: Props) {
  const { slug } = params;

  const sessionPromise = getAuthSession();

  const subredditPromise = db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  const [session, subreddit] = await Promise.all([
    sessionPromise,
    subredditPromise,
  ]);

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
    </>
  );
}
