import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SingleBlog = () => {
  const { blogId } = useParams();
  const { user } = useSelector((store) => store.user);
  const [singleBlog, setSingleBlog] = useState({});
  const [isAuthor, setIsAuthor] = useState(false);
  const fetchSingleBlog = async () => {
    try {
      const res = await axios.get(
        `https://blog-deploy-afnh.onrender.com/api/blog/${blogId}`
      );
      setSingleBlog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, [blogId]);

  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="w-full flex justify-center items-center h-80 border-spacing-16 border-gray-900 rounded-lg border border-dotted cursor-pointer">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={singleBlog.poster}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            Author:
          </label>

          <h3
            id="title"
            className="bg-gray-300 py-3 px-6 rounded-lg outline-none"
          >
            {singleBlog.author ? singleBlog.author : "Unknown"}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            Title:
          </label>

          <h3
            id="title"
            className="bg-gray-300 py-3 px-6 rounded-lg outline-none"
          >
            {singleBlog.title}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-bold">
            Description:
          </label>

          <p
            type="text"
            className="bg-gray-300 rounded-lg py-3 px-6 outline-none flex flex-wrap"
          >
            {singleBlog.description}
          </p>
        </div>
        {singleBlog.userID === user?._id && (
          <button
            type="submit"
            className="py-2 text-white font-semibold text-xl px-7 bg-green-500 rounded-lg"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
