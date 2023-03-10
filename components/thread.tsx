import Link from "next/link";
import Textbox from "./textbox";
import ThreadHeader from "./ThreadHeader";

interface IUser {
  id: number;
  name: string;
}

interface ThreadProps {
  id: number;
  user: IUser;
  text: string;
  createdAt: string;
  likes: number;
}

export default function Thread({
  id,
  user,
  text,
  createdAt,
  likes,
}: ThreadProps) {
  return (
    <Link href={`/tweet/${id}`}>
      <div className="cursor-pointer rounded-md border border-red-200 px-4 text-white hover:bg-zinc-900">
        <ThreadHeader name={user.name} createdAt={createdAt} />
        <Textbox text={text} />
        <div className="flex items-end justify-end">
          <div className="flex items-center space-x-0.5 text-sm">
            <svg
              className="h-5 w-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span className="text-lg">{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
