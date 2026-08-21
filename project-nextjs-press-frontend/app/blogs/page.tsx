import { cacheLife } from "next/cache";
import getBlogs from "../service/getBlogs";
import MyServerComponent from "../ui/MyServerComponent";

const BlogsPage = async () => {
  // "use cache";
  cacheLife({
    stale: 3600, // 1 hour until considered stale
    revalidate: 7200, // 2 hours until revalidated
    expire: 86400, // 1 day until expired
  });
  const blogs = await getBlogs();
  return (
    <div>
      Blogs Page
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {blogs.map((blog: any) => {
        return (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
          </div>
        );
      })}
      <MyServerComponent />
    </div>
  );
};

export default BlogsPage;
