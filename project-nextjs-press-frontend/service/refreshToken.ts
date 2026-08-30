"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookiesStore = await cookies();

  const refreshToken = cookiesStore.get("refreshToken")?.value || null;

  if (!refreshToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "Refresh Token Not Found",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,

    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-cache",
    },
  );

  const result = await res.json();
  //console.log("result", result);

  return result;
};
