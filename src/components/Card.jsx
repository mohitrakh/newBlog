import React from "react";
import { Link } from "react-router-dom";
const Card = ({ blog }) => {
  let date = new Date(blog.createdAt);

  return (
    <Link to={`/blog/${blog._id}`} className="flex items-center gap-5">
      <div className="">
        <img
          className="rounded-lg min-w-60 object-contain max-w-60 max-h-32"
          src={blog.poster}
          alt=""
        />
      </div>
      <div className=" flex flex-col gap-2">
        <h2 className="font-bold text-[16px]">{blog.title}</h2>
        <p className="flex gap-3">
          <a href="#" className=" text-gray-700">
            created by{" "}
            <span className="font-semibold">
              {blog.author ? blog.author : "Unknown"}
            </span>
          </a>
          <time className="text-gray-700">
            {date.toDateString()}
            {/* {date.toUTCString()}
            {date.getMonth()}
            {date.getDate()}
            {date.getFullYear()} */}
          </time>
        </p>
        <p className="line-clamp-3">{blog.description.slice(0, 100)}...</p>
      </div>
    </Link>
  );
};

export default Card;
