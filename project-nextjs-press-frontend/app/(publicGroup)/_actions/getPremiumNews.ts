"use server";

import { cookies } from "next/headers";

export const getPremiumNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  console.log("params", params.toString());
  //?bad approach to get search term from search params
  // const searchTerm = `${search?.searchTerm ? `?searchTerm=${search?.searchTerm}` : ""}`;
  const cookiesStore = await cookies();

  const accessToken = cookiesStore.get("accessToken")?.value || null;

  if (!accessToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "User Not Logged In",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/premium?${params.toString()}`,
    {
      headers: {
        // Authorization: accessToken?.value as unknown as string,
        // Authorization: `${accessToken.value}`,
        // Authorization: `Bearer ${accessToken.value}`,
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 1000 * 60 * 60 * 24,
        tags: ["premium-posts"],
      },
    },
  );

  const result = res.json();

  return result;
};
