"use server";

type LoginStatue = {
  sccess: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  previousState: LoginStatue,
  formData: FormData,
) => {
  console.log("formData", formData);
  console.log("PreviousState", previousState);

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

  console.log("result", result);
  return result;
};
