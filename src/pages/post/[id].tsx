// [slug].tsx will catch all routes that are not defined, so basically anything that comes like www.website.com/@username

import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { LoadingPage } from "~/components/Loading";
import { api } from "~/utils/api";

import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postView";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isLoading } = api.posts.getById.useQuery({
    id,
  });

  if (isLoading) return <LoadingPage />;

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - ${data.author.username}`}</title>
      </Head>

      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

// This makes sure that the data is already there when the user gets there
export const getStaticProps: GetStaticProps = async (context) => {
  const ssgHelper = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("No Id");

  const username = id.replace("@", "");

  await ssgHelper.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssgHelper.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
