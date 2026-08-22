"use client";

import { Button } from "@/components/ui/button";

const LoginBtn = () => {
  console.log("Login Btn", process.env.NEXT_PUBLIC_BACKEND_API_URL);
  return (
    <Button>
      Login
      {process.env.NEXT_PUBLIC_BACKEND_API_URL}
    </Button>
  );
};

export default LoginBtn;
