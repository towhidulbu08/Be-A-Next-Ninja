/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

export const createPost = async (prevState: PostState, formData: FormData) => {
  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium"),
  };
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      // Authorization: accessToken?.value as unknown as string,
      // Authorization: `${accessToken.value}`,
      // Authorization: `Bearer ${accessToken.value}`,
      Cookie: `accessToken=${accessToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", "max");
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", "max");
  } else {
    revalidateTag("public-news", "max");
  }
  return result;
};

export const getMyPosts = async () => {
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get("accessToken");

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      // Authorization: accessToken?.value as unknown as string,
      // Authorization: `${accessToken.value}`,
      // Authorization: `Bearer ${accessToken.value}`,
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 1000 * 60 * 60 * 24,
      tags: ["my-profile"],
    },
  });

  const result = res.json();

  return result;
};
