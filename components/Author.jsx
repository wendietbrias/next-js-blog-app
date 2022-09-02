const Author = ({ author }) => {
  return (
    <div className="w-full bg-white py-5 px-5 rounded-lg relative text-center">
      <img
        src={author?.profile?.url}
        alt={author?.name}
        className="w-20 h-20 border-[3px] border-pink-500 absolute -top-5 left-[50%] -translate-x-[50%] rounded-full"
      />
      <h5 className="font-bold text-2xl mt-14">{author?.name}</h5>
      <p className="text-gray-600 mt-1 font-medium">{author?.bio}</p>
    </div>
  );
};

export default Author;
