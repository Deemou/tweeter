import { User } from "@prisma/client";
import { useRouter } from "next/router";

interface HeaderProps {
  user?: User;
}

interface LogoutResponse {
  ok: boolean;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const loginUrl = "/log-in";
  const signUpUrl = "/create-account";
  const logoutUrl = "/api/users/log-out";

  function isAuthPages() {
    return router.pathname === loginUrl || router.pathname === signUpUrl;
  }

  const onClick = async () => {
    const logoutData: LogoutResponse = await fetch(logoutUrl).then((response) =>
      response.json()
    );
    if (logoutData.ok) {
      router.replace(loginUrl);
    }
  };
  return (
    <div className="flex items-center justify-end space-x-3 p-2 px-4 font-medium text-white shadow-xl">
      {!isAuthPages() ? (
        <>
          <span>Hello, {user?.name}!</span>
          <button
            onClick={onClick}
            className="rounded-lg border border-white bg-white px-4 py-2 text-black hover:bg-slate-800 hover:text-white"
          >
            Log out
          </button>
        </>
      ) : null}
    </div>
  );
}
