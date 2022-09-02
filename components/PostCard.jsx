import Image from "next/image";
import Link from "next/link";
import { AiOutlineCalendar } from "react-icons/ai";

const PostCard = ({ post }) => {
  return (
    <div className="w-full bg-white rounded-md sm:p-5 xl:p-7 shadow-lg mb-6">
      <div className="w-full h-[320px] ">
        <img
          src={post?.image?.url}
          alt={post?.title}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="mt-5 text-center">
        <Link href={`/detail/${post?.slug}`}>
          <h2 className="text-2xl font-bold transition duration-300 hover:text-pink-500 cursor-pointer">
            {post?.title}
          </h2>
        </Link>
        <div className="flex justify-center mt-3 mb-7">
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
        <p className="font-normal text-gray-500 px-12">{post?.excerpt}</p>
        <button className="bg-pink-500 mt-7 text-md font-semibold text-white rounded-full py-3 px-5 transition duration-300 hover:-translate-y-2">
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default PostCard;
