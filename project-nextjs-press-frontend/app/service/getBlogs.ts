import { revalidateTag } from "next/cache";

const getBlogs = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60,
      tags: ["posts"],
    },
    cache: "force-cache",
    method: "POST",
  });
  const data = await posts.json();

  console.log("posts", data);

  return data;
};

const renewBlogCache = () => {
  //revalidateTag("posts", "max");
  revalidateTag("posts", {
    expire: 60 * 60 * 24 * 7,
  });
};
export default getBlogs;
