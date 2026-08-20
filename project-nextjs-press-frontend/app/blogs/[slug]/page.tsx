const DynamicrPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <div> Dynamic Page: {slug} </div>;
};

export default DynamicrPage;
