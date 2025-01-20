"use client";
import { IAuth, ILoginForm } from "@/app/interfaces/login.interface";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_SCHEMA } from "@/app/validations/login.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/services/api/auth/auth";
import { toast } from "react-toastify";
import { useAppLoading } from "@/hooks/use-loading";

function LoginForm() {
  const [login, { isSuccess, isLoading }] = useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);

  useAppLoading([isLoading]);
  const form = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const onSubmit = async (data: ILoginForm) => {
    const payload: IAuth = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await login(payload);
      if (res.error) {
        const err = res.error as any;
        throw new Error(err?.data?.message);
      }
      if (!res.data) return;
      localStorage.setItem("information", JSON.stringify(res.data));
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Username"></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Password"
                  type="password"
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
