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
// import axios from "axios";
import {
  useLazyCheckAuthQuery,
  useLoginMutation,
} from "@/services/api/auth/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IAuthStore } from "@/store/auth";

function LoginForm() {
  const [login] = useLoginMutation();
  const [checkAuth] = useLazyCheckAuthQuery();
  const { isAuthenciated } = useSelector<RootState,IAuthStore>((s) => s.auth);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenciated) {
      router.push("/");
    }
  }, [isAuthenciated]);
  const form = useForm<ILoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(LOGIN_SCHEMA),
  });

  const onSubmit = async (data: ILoginForm) => {
    const payload: IAuth = {
      grant_type: process.env.grant_type || "password",
      username: data.username,
      password: data.password,
      client_id:
        process.env.client_id ||
        "personal-client-bb5c4fd7-9119-4576-906e-06406365d47e-1f4c55e7",
      client_secret:
        process.env.client_secret || "9Pbq6bfgq6oCmUCy2THQ6zbMQHK4yVw6",
    };
    const res = await login(payload);
    localStorage.setItem("information", JSON.stringify(res.data));
    await checkAuth();
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
