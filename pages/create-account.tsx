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
  password: string;
  formErrors?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
  error?: string;
}

const Create: NextPage = () => {
  const [create, { loading, data }] = useMutation<MutationResult>(
    "/api/users/create-account"
  );
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<AccountForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();

  const onClick = () => {
    clearErrors("formErrors");
  };
  const onValid = (validForm: AccountForm) => {
    if (loading) return;
    create(validForm);
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
    if (tokenData && !tokenData.ok && tokenData.error) {
      setError("formErrors", { message: tokenData.error });
    }
  }, [tokenData, setError]);
  useEffect(() => {
    if (tokenData?.ok) {
      console.log("token ok!!");
      void router.replace("/");
    }
  }, [tokenData, router]);
  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold text-white">
        Sign up for Tweeter
      </h3>
      <div className="mt-12">
        {data?.ok ? (
          <div>
            <form
              onClick={onClick}
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
              {errors.formErrors ? (
                <span className="my-2 block bg-red-50 text-center font-medium text-red-600">
                  {errors.formErrors.message}
                </span>
              ) : null}
              <Button text={tokenLoading ? "Loading" : "Confirm Token"} />
            </form>
            <span className="my-4 flex justify-center text-lg font-medium text-red-400">
              We've sent a verification code to your email.
            </span>
          </div>
        ) : (
          <>
            <form
              onClick={onClick}
              onSubmit={(...args) => void handleSubmit(onValid)(...args)}
              className="mt-8 flex flex-col space-y-4"
            >
              <Input
                register={register("email", {
                  required: true,
                  validate: {},
                })}
                name="email"
                label="Email address"
                type="email"
                required
              />
              {errors.formErrors ? (
                <span className="my-2 block bg-red-50 text-center font-medium text-red-600">
                  {errors.formErrors.message}
                </span>
              ) : null}
              <Input
                register={register("password", {
                  required: true,
                  minLength: {
                    value: 10,
                    message: "Password should be at least 10-lengths",
                  },
                })}
                name="password"
                label="Password"
                type="password"
                required
              />
              {errors.password ? (
                <span className="my-2 block bg-red-50 text-center font-medium text-red-600">
                  {errors.password.message}
                </span>
              ) : null}
              <Button text={loading ? "Loading" : "Create Account"} />
            </form>
          </>
        )}
        <Link href="/log-in">
          <a className="mt-4 flex cursor-pointer justify-center text-center font-medium">
            <span className="text-white">
              You already have an account? Login!
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Create;
