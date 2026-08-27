"use server";

import { cookies } from "next/headers";

import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

type LoginStatue = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type registerStatue = {
  id: string;
  name: string;
  email: string;
  activeStatus: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    id: string;
    profilePhoto: string;
    bio: null | string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const loginAction = async (
  previousState: LoginStatue,
  formData: FormData,
) => {
  // console.log("formData", formData);
  // console.log("PreviousState", previousState);

  const email = formData.get("email");
  const password = formData.get("password");

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    // Store the access token and refresh token in browser cookies

    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    console.log("decodedToken", decodedToken);

    if (decodedToken.role === "USER") {
      redirect("/dashboard");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/admin-dashboard");
    } else if (decodedToken.role === "AUTHOR") {
      redirect("/author-dashboard");
    }
  }

  return result;
};

export const registerAction = async (
  previousState: registerStatue,
  formData: FormData,
) => {
  console.log("formData", formData);
  console.log("PreviousState", previousState);

  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const profilePhoto = formData.get("password");

  const payload = {
    email,
    password,
    name,
    profilePhoto,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};
