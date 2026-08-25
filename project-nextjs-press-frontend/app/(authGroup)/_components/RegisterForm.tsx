"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authAction";

const RegisterForm = () => {
  const [state, action, isPending] = useActionState(registerAction, false);
  console.log("state", state);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Register  Successful");
      //? Client Side Navigation
      router.push("/login");
    }
    if (!state.success) {
      toast.error(state.message || "Login Failed");
    }
  }, [state, router]);
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
        <Input
          name="profilePhoto"
          type="text"
          placeholder="Enter Your profile photo"
          required
        />
        <Input name="name" type="text" placeholder="Enter Your Name" required />
        <Button type="submit">{isPending ? "Sumitting..." : "Register"}</Button>
      </Card>
    </form>
  );
};

export default RegisterForm;
