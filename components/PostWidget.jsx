import { getRecentPosts, getRelatedPosts } from "../service";
import { useEffect, useState } from "react";
import Link from "next/link";

const PostWidget = ({ slug, category }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    if (!slug) {
      const getRecent = await getRecentPosts();
      setPosts(getRecent);
    } else {
      const getRelatedPostsed = await getRelatedPosts(slug, category);
      setPosts(getRelatedPostsed);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full px-5 bg-white rounded-md mb-8">
      <h4 className="text-xl font-bold border-b border-gray-200 py-3">
        {slug ? "Related Posts" : "Recent Posts"}
      </h4>
      <div className="w-full py-3">
        {posts?.map(({ node: post }, idx) => (
          <div key={idx} className="flex items-center my-3">
            <img
              className="w-14 h-14 rounded-full"
              src={post?.image?.url}
              alt={post?.title}
            />
            <div className="flex-1 ml-4">
              <p className="text-gray-500 text-sm">
                {new Date(post?.createdAt).toDateString()}
              </p>
              <Link href={`/detail/${post?.slug}`}>
                <h5 className="text-md font-semibold cursor-pointer">
                  {post?.title}
                </h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidget;
