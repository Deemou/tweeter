import type { NextPage } from "next";
import { Tweet } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "@/libs/client/useMutation";
import cls from "@/libs/client/utils";
import Textbox from "@/components/textbox";
import Header from "@/components/header";

interface IUser {
  id: number;
  name: string;
}

export interface ITweet extends Tweet {
  user: IUser;
}

export interface TweetResponse {
  ok: boolean;
  tweet: ITweet;
  likes: number;
  isLiked: boolean;
}

const TweetDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<TweetResponse>(
    router.query.id ? `/api/tweet/${router.query.id}` : null
  );
  const [toggleLike] = useMutation(`/api/tweet/${router.query.id}/like`);
  const onLikeClick = () => {
    if (!data) return;
    const newLikes = data.isLiked ? data.likes - 1 : data.likes + 1;
    void mutate({ ...data, likes: newLikes, isLiked: !data.isLiked }, false);
    toggleLike({});
  };
  return (
    <>
      <Header />
      <div className="rounded-md border border-red-200 px-4 text-white">
        <div className="flex items-center space-x-3 py-4">
          <div className="h-8 w-8 rounded-md bg-red-400" />
          <h3 className="text-lg font-medium">{data?.tweet.user.name}</h3>
        </div>
        <Textbox text={data?.tweet.text} textSize="text-lg" />
        <div className="my-2">
          <span className="text-base">{data?.likes} Likes</span>
          <div className="flex justify-end">
            <div className="flex items-center space-x-0.5 text-sm text-red-600">
              <button
                onClick={onLikeClick}
                className={cls(
                  "flex items-center justify-center rounded-md p-1 hover:bg-gray-100 ",
                  data?.isLiked
                    ? "text-red-500  hover:text-red-600"
                    : "text-gray-400  hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetDetail;
