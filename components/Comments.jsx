import { useState, useEffect } from "react";
import { getCommentsPost } from "../service";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const comment = await getCommentsPost(slug);
      setComments(comment.comments);
    };

    fetchComments();
  }, []);

  return (
    <div className="w-full bg-white py-3 px-7 rounded-lg mt-8">
      <h2 className="font-bold border-b border-gray-100 pb-3">
        {comments.length} Comments
      </h2>
      {comments.length > 0 ? (
        <div className="w-full py-1">
          {comments.map((comment, idx) => (
            <div key={idx} className="block my-4">
              <h5 className="text-gray-800 font-semibold text-md">
                {comment?.email}
              </h5>
              <p className="text-gray-600 ml-1 mt-1 text-sm">
                {comment?.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="font-semibold lowercase text-lg">
            No Comments At This Posts
          </h2>
        </div>
      )}
    </div>
  );
};

export default Comments;
