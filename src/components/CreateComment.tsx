"use client";

import { useState } from "react";

import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";

type Props = {};

export default function CreateComment({}: Props) {
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToast();

  const {} = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.post(
        "/api/r/subreddit/post/comment",
        payload
      );
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          loginToast();
        }
      }

      return toast({
        title: "Something went wrong",
        description: "Something went wrong while creating your post",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />
      </div>

      <div>
        <Button>Post</Button>
      </div>
    </div>
  );
}
