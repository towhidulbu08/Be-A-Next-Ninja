import Link from "next/link";
import Button from "./ui/button";

export default function Home() {
  console.log("Home page");
  return (
    <div>
      Home Page
      <p>
        Blog Page: <Link href={"/blogs/1"}>Blogs</Link>
      </p>
      <Button />
    </div>
  );
}
