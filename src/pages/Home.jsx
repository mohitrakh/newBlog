import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState();
  const [isError, setIsError] = useState(false);

  const fetchAllBlogs = async () => {
    try {
      const res = await axios.get(
        "https://blog-deploy-afnh.onrender.com/api/blog/all"
      );
      setBlogs(res.data);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  if (isError) {
    return <h1>Something went Wrong!!!</h1>;
  }

  return (
    <div className="flex flex-col gap-6 mt-20">
      {blogs?.map((blog) => {
        return <Card blog={blog} />;
      })}
    </div>
  );
};

export default Home;
