"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function subscribePremium() {
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
    `${process.env.BACKEND_API_URL}/api/subscription/checkout`,
    {
      method: "POST",
      headers: {
        // Authorization: accessToken?.value as unknown as string,
        // Authorization: `${accessToken.value}`,
        // Authorization: `Bearer ${accessToken.value}`,
        Cookie: `accessToken=${accessToken.value}`,
      },
    },
  );

  const result = await res.json();

  if (result.success && result.data.payment) {
    redirect(result.data.payment);
  }
}
