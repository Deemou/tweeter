import type { NextPage } from "next";
import Button from "@components/button";
import TextArea from "@components/textarea";
import Thread from "@/components/thread";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Head from "next/head";
import useSWR from "swr";
import { Tweet } from "@prisma/client";

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
}

const Home: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<UploadTweetForm>();
  const { data } = useSWR<TweetsResponse>("/api/tweet");
  const [uploadTweet, { loading, data: uploadData }] =
    useMutation<UploadTweetMutation>("/api/tweet");

  const onValid = (tweetData: UploadTweetForm) => {
    if (loading) return;
    uploadTweet(tweetData);
    reset();
  };

  //useMutation bound
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div className="space-y-4">
        <form
          className="space-y-4 rounded-md border border-red-200 p-4"
          onSubmit={(...args) => void handleSubmit(onValid)(...args)}
        >
          <TextArea
            register={register("text", { required: true })}
            name="description"
            required
            placeholder="What's happening?"
          ></TextArea>
          <Button text={loading ? "Loading..." : "Tweet"} />
        </form>

        <div className="flex flex-col space-y-5">
          {data?.tweets?.map((tweet) => (
            <Thread
              id={tweet.id}
              key={tweet.id}
              user={tweet.user}
              text={tweet.text}
              likes={tweet._count.likes}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
