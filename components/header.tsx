import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";

interface LogoutResponse {
  ok: boolean;
}

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
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
    <div className="mb-6 flex items-center justify-end space-x-3 p-2 px-4 font-medium text-white">
      {!isAuthPages() ? (
        <>
          <span>Hello, {user?.name}!</span>
          <button
            onClick={onClick}
            className="rounded-lg border border-white bg-white px-2 py-1 text-black hover:bg-black hover:text-white"
          >
            Log out
          </button>
        </>
      ) : null}
    </div>
  );
}
