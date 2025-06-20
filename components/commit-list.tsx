"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";

interface GitHubCommit {
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
}

export default function CommitList({
  repo,
  owner,
}: {
  repo: string;
  owner: string;
}) {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);

  useEffect(() => {
    const loadCommits = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/repo/commits`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ repo, owner }),
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCommits(data.commits);
      } catch (error) {
        toast.error("Error occurred while loading commits. Please try again.");
        console.error("error", error);
      }
    };
    loadCommits();
  }, [repo, owner]);

  return (
    <ul>
      {commits.map((commit, index) => (
        <li key={index}>
          {commit?.commit?.message}{" "}
          <Badge className="ml-2">
            {formatDistanceToNow(new Date(commit?.commit?.author?.date), {
              addSuffix: true,
            })}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
