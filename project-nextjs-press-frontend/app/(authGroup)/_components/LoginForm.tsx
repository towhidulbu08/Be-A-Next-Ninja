"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../_actions/authAction";

const LoginForm = () => {
  const [state, action, isPending] = useActionState(loginAction, false);
  // const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login Successful");
      //? Client Side Navigation
      //router.push("/dashboard");
    }
    if (!state.success) {
      toast.error(state.message || "Login Failed");
    }
  }, [state]);
  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          required
        />
        <Button type="submit">{isPending ? "Submitting...." : "Login"}</Button>
      </Card>
    </form>
  );
};

export default LoginForm;
