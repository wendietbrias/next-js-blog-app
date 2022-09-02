import { getDetailPost } from "../../service";
import {
  PostWidget,
  Categories,
  Author,
  CommentForm,
  Comments,
  Alert,
} from "../../components";
import Image from "next/image";
import { AiOutlineCalendar } from "react-icons/ai";
import Head from "next/head";

const PostDetail = ({ post }) => {
  return (
    <div className="w-full">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>{post?.title}</title>
      </Head>
      <div className="grid xl:grid-cols-12 sm:grid-cols-1 py-12 gap-12">
        <section className="xl:col-span-8 sm:col-span-1">
          <div className="w-full mb-12 bg-white rounded-md shaodw-lg p-6">
            <div className="w-full h-[400px] rounded-md">
              <Image
                src={post?.image?.url}
                alt={post?.title}
                layout="responsive"
                width={400}
                height={177}
                className="rounded-lg"
              />
            </div>
            <div className="post-details-content pt-5 px-8">
              <h2 className="text-center text-3xl font-bold">{post?.title}</h2>
              <div className="flex justify-center mt-7 mb-10">
                <span className="flex items-center mr-4">
                  <AiOutlineCalendar className="text-pink-500" />
                  <h5 className="text-sm text-gray-500 font-medium ml-2">
                    {new Date(post?.createdAt).toDateString()}
                  </h5>
                </span>
                <span className="flex items-center">
                  <img
                    src={post?.author?.profile?.url}
                    alt={post?.author?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <h5 className="text-sm text-gray-600 font-medium ml-2">
                    {post?.author?.name}
                  </h5>
                </span>
              </div>
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: post?.content?.html }}
              ></div>
            </div>
          </div>
          <Author author={post?.author} />
          <CommentForm slug={post?.slug} />
          <Comments slug={post?.slug} />
        </section>
        <section className="xl:col-span-4 sm:col-span-1">
          <PostWidget slug={post?.slug} category={post?.category?.category} />
          <Categories />
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { slug } = query;
  const postDetail = await getDetailPost(slug);

  return {
    props: {
      post: postDetail.post,
    },
  };
};

export default PostDetail;
