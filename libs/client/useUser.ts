import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const router = useRouter();
  const reqestUrl = "/api/users/me";
  const loginUrl = "/log-in";
  const signUpUrl = "/create-account";
  const { data, error } = useSWR<ProfileResponse>(reqestUrl);

  function isAuthPages() {
    return router.pathname === loginUrl || router.pathname === signUpUrl;
  }

  useEffect(() => {
    if (isAuthPages()) return;
    if (data && !data.ok) {
      void router.replace(loginUrl);
      return;
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
