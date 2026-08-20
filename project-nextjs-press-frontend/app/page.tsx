import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home Page
      <p>
        Blog Page: <Link href={"/blogs/1"}>Blogs</Link>
      </p>
    </div>
  );
}
