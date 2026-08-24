import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {
  const user = await getMe();
  console.log("userFromPage.tsx", user);
  return (
    <div>
      Home Page
      <Button>Click Me</Button>
    </div>
  );
}
