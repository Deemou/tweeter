import type { NextPage } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/header";

interface LoginForm {
  email: string;
  password: string;
  formErrors?: string;
}

interface MutationResult {
  ok: boolean;
  error?: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data }] =
    useMutation<MutationResult>("/api/users/log-in");
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>();

  const onClick = () => {
    clearErrors("formErrors");
  };
  const onValid = (validForm: LoginForm) => {
    if (loading) return;
    enter(validForm);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  useEffect(() => {
    if (data?.ok) {
      location.reload();
    }
  }, [data, router]);
  return (
    <>
      <Header />
      <div className="mt-16 px-4">
        <h3 className="text-center text-3xl font-bold text-white">
          Log in to Tweeter
        </h3>
        <div className="mt-12">
          <div>
            <form
              onClick={onClick}
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
              <Input
                register={register("password", {
                  required: true,
                })}
                name="password"
                label="Password"
                type="password"
                required
              />
              {errors.formErrors ? (
                <span className="my-2 block text-center font-medium text-red-600">
                  {errors.formErrors.message}
                </span>
              ) : null}
              <Button text={loading ? "Loading" : "Continue"} />
            </form>
            <Link href="/create-account">
              <a className="mt-4 flex cursor-pointer justify-center text-center font-medium">
                <span className="text-white">
                  You don't have an account yet? Sign up!
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Enter;
