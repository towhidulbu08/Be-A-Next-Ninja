const MyServerComponent = async () => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60,
    },
  });
  const data = await posts.json();
  console.log("data", data);
  return <div>MyServer Component</div>;
};

export default MyServerComponent;
