import type { NextPage } from "next";
import Button from "@components/button";
import TextArea from "@components/textarea";
import Thread from "@/components/thread";
import Head from "next/head";
import { Tweet } from "@prisma/client";
import { FormEvent, useEffect } from "react";
import useMutation from "@libs/client/useMutation";
import useInfiniteScroll from "@/libs/client/useInfiniteScroll";
import useSWRInfinite from "swr/infinite";
import Header from "@/components/header";

interface UploadTweetForm {
  text: string;
}

interface UploadTweetMutation {
  ok: boolean;
  tweet: Tweet;
}

interface IUser {
  id: number;
  name: string;
}

export interface TweetResponse extends Tweet {
  _count: {
    likes: number;
  };
  user: IUser;
}

interface TweetsResponse {
  ok: boolean;
  tweets: TweetResponse[];
  lastPage: number;
}

const requestUrl = "/api/tweet";
const getKey = (pageIndex: number, previousPageData: TweetsResponse) => {
  if (pageIndex === 0) return `${requestUrl}?page=1`;
  if (pageIndex + 1 > previousPageData.lastPage) return null;
  return `${requestUrl}?page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const textId = "text";

const Home: NextPage = () => {
  const [uploadTweet, { loading }] =
    useMutation<UploadTweetMutation>("/api/tweet");

  const { data, setSize } = useSWRInfinite<TweetsResponse>(getKey, fetcher, {
    refreshInterval: 1000,
  });

  const page = useInfiniteScroll();
  useEffect(() => {
    void setSize(page);
  }, [setSize, page]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (loading) return;

    e.preventDefault();

    const tar = document.getElementById(textId);
    if (!tar) return;

    const tweetData: UploadTweetForm = { text: tar.innerText };
    if (!tweetData.text) return;

    uploadTweet(tweetData);
    tar.innerText = "";
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Header />
      <div className="space-y-12">
        <form
          name="myForm"
          className="space-y-4 rounded-md border border-red-200 p-4"
          onSubmit={onSubmit}
        >
          <TextArea name={textId} placeholder="What's happening?"></TextArea>
          <Button text={loading ? "Loading..." : "Tweet"} />
        </form>

        <div className="flex flex-col space-y-12">
          {data?.map((tweetsPage) => {
            return tweetsPage.tweets?.map((tweet) => (
              <Thread
                id={tweet.id}
                key={tweet.id}
                user={tweet.user}
                text={tweet.text}
                likes={tweet._count.likes}
              />
            ));
          })}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Home;
