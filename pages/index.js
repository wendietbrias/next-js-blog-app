import Head from "next/head";
import { getAllPosts } from "../service";
import { PostCard, Categories, PostWidget, FeaturedPosts } from "../components";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NEXT-BLOG-APP</title>
      </Head>
      <FeaturedPosts />
      <div className="grid gap-12 sm:grid-cols-1 xl:grid-cols-12 mt-10 mb-10">
        <section className="xl:col-span-8 sm:col-span-1">
          {Array.isArray(posts) &&
            posts.length > 0 &&
            posts.map((post, idx) => <PostCard key={idx} post={post?.node} />)}
        </section>
        <section className="sticky xl:col-span-4 sm:col-span-1">
          <PostWidget />
          <Categories />
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts,
    },
  };
};
