"use server";

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get("accessToken");

  if (!accessToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "User Not Logged In",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/subscription/status`,
    {
      headers: {
        // Authorization: accessToken?.value as unknown as string,
        // Authorization: `${accessToken.value}`,
        // Authorization: `Bearer ${accessToken.value}`,
        Cookie: `accessToken=${accessToken.value}`,
      },
    },
  );

  const result = res.json();

  return result;
};
