const BlogsPage = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60,
    },
  });
  const data = await posts.json();

  console.log("posts", data);
  return <div>Blogs Page</div>;
};

export default BlogsPage;
