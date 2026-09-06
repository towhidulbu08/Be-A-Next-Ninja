import { cookies } from "next/headers";

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
