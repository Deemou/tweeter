import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";

interface AccountForm {
  email: string;
  formErrors?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  error?: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data }] = useMutation<MutationResult>(
    "/api/users/create-account"
  );
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AccountForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const onValid = (validForm: AccountForm) => {
    if (loading) return;
    enter(validForm);
  };
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  useEffect(() => {
    if (tokenData?.ok) {
      void router.push("/");
    }
  }, [tokenData, router]);
  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Sign up for Tweeter</h3>
      <div className="mt-12">
        {data?.ok ? (
          <div>
            <form
              onSubmit={(...args) =>
                void tokenHandleSubmit(onTokenValid)(...args)
              }
              className="mt-8 flex flex-col space-y-4"
            >
              <Input
                register={tokenRegister("token", {
                  required: true,
                })}
                name="token"
                label="Confirmation Token"
                type="number"
                required
              />
              <Button text={tokenLoading ? "Loading" : "Confirm Token"} />
            </form>
            <span>We sent a verification code to your email.</span>
          </div>
        ) : (
          <>
            <form
              onSubmit={(...args) => void handleSubmit(onValid)(...args)}
              className="mt-8 flex flex-col space-y-4"
            >
              <Input
                register={register("email", {
                  required: true,
                })}
                name="email"
                label="Email address"
                type="email"
                required
              />
              {errors.formErrors ? (
                <span className="my-2 block text-center font-medium text-red-500">
                  {errors.formErrors.message}
                </span>
              ) : null}
              <Button text={loading ? "Loading" : "Create Account"} />
            </form>
          </>
        )}
        <Link href="/log-in">
          <a className="text-center cursor-pointer flex justify-center font-medium">
            <span>You already have an account? Login!</span>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Enter;
