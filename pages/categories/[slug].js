import { getPostCategories, getCategoriesPosts } from "../../service";
import { PostCard, PostWidget, Categories } from "../../components";

const CategoriesPages = ({ posts }) => {
  return (
    <div className="w-full py-8">
      <div className="grid xl:grid-cols-12 sm:grid-cols-1 gap-12">
        <section className="col-span-1 xl:col-span-8">
          {posts?.map((item, idx) => (
            <PostCard key={idx} post={item} />
          ))}
        </section>
        <section className="col-span-1 xl:col-span-4">
          <PostWidget />
          <Categories />
        </section>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const posts = await getCategoriesPosts(slug);

  return {
    props: {
      posts: posts,
    },
  };
};

export const getStaticPaths = async () => {
  const allCategories = await getPostCategories();
  return {
    paths: allCategories.map((slug, idx) => ({ params: { slug: slug?.slug } })),
    fallback: false,
  };
};

export default CategoriesPages;
