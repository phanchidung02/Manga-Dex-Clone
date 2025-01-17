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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IAuthStore } from "@/store/auth";

function LoginForm() {
  const [login] = useLoginMutation();
  const { isAuthenciated } = useSelector<RootState, IAuthStore>((s) => s.auth);
  useEffect(() => {
    if (isAuthenciated) {
      window.location.href = "/";
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
      username: data.username,
      password: data.password,
    };
    const res = await login(payload);
    if (!res.data) return;
    localStorage.setItem("information", JSON.stringify(res.data));
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
