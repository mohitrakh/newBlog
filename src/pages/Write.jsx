import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Write = () => {
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    poster: "",
    category: [],
  });
  const [filePerc, setFilePerc] = useState(0);
  const [setUploadError, setSetUploadError] = useState(null);
  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setBlogData({
            ...blogData,
            poster: downloadUrl,
          });
        });
      }
    );
  };

  const options = [
    { value: "Technology", label: "Technology" },
    { value: "Programming", label: "Programming" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Development", label: "Mobile Development" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
    { value: "Robotics", label: "Robotics" },
    { value: "Augmented Reality (AR)", label: "Augmented Reality (AR)" },
    { value: "Virtual Reality (VR)", label: "Virtual Reality (VR)" },
    { value: "Game Development", label: "Game Development" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Content Creation", label: "Content Creation" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Finance", label: "Finance" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Education", label: "Education" },
    { value: "Travel", label: "Travel" },
    { value: "Food & Cooking", label: "Food & Cooking" },
    { value: "Fashion & Lifestyle", label: "Fashion & Lifestyle" },
    { value: "Sports & Fitness", label: "Sports & Fitness" },
    { value: "Music & Entertainment", label: "Music & Entertainment" },
    { value: "Books & Literature", label: "Books & Literature" },
    { value: "Science & Technology", label: "Science & Technology" },
    {
      value: "Environment & Sustainability",
      label: "Environment & Sustainability",
    },
    { value: "Social Issues & Activism", label: "Social Issues & Activism" },
    { value: "Self Improvement", label: "Self Improvement" },
    { value: "Productivity", label: "Productivity" },
    { value: "Mindfulness & Meditation", label: "Mindfulness & Meditation" },
    { value: "Relationships & Dating", label: "Relationships & Dating" },
    { value: "Parenting", label: "Parenting" },
    { value: "Pets & Animals", label: "Pets & Animals" },
    { value: "Photography", label: "Photography" },
    { value: "Art & Design", label: "Art & Design" },
  ];

  const handleAntDVal = (val, name) => {
    setBlogData({
      ...blogData,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://blog-deploy-afnh.onrender.com/api/blog/write",
        {
          title: blogData.title,
          description: blogData.description,
          poster: blogData.poster,
          category: blogData.category,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("uploaded");
      setBlogData({
        title: "",
        description: "",
        poster: "",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-6">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        ref={fileref}
        hidden
        accept="images/*"
      />
      <div
        onClick={() => fileref.current.click()}
        className="w-full flex justify-center items-center h-80 border-spacing-16 border-gray-900 rounded-lg border border-dotted cursor-pointer"
      >
        {blogData.poster ? (
          <img
            className="w-full h-full object-cover rounded-lg"
            src={blogData.poster}
            alt=""
          />
        ) : (
          <AiOutlinePlusCircle className="text-8xl" />
        )}
      </div>
      <p>
        {filePerc === 100
          ? "File uploaded Successfully"
          : filePerc === 0
          ? ""
          : filePerc}
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="" className="font-bold">
              Title:
            </label>
            <p>
              {blogData.title.length} / {100}
            </p>
          </div>
          <input
            type="text"
            id="title"
            required
            max={100}
            value={blogData.title}
            onChange={handleChange}
            className="bg-gray-300 py-3 px-6 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="" className="font-bold">
              Description:
            </label>
            <p>
              {blogData.description.length} / {1000}
            </p>
          </div>

          <textarea
            type="text"
            required
            className="bg-gray-300 rounded-lg py-3 px-6 outline-none"
            id="description"
            minLength={200}
            maxLength={1000}
            value={blogData.description}
            onChange={handleChange}
            rows={10}
          />
        </div>
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          value={blogData.category}
          placeholder="Tags Mode"
          onChange={(val) => handleAntDVal(val, "category")}
          options={options}
        />
      </div>
      <p>{isError}</p>
      <div className="flex justify-between">
        <button
          type="submit"
          className="py-2 text-white font-semibold text-xl px-7 bg-green-500 rounded-lg"
        >
          Publish
        </button>
        <Link
          className="py-2 text-white font-semibold text-xl px-7 rounded-lg bg-red-400"
          to={"/"}
        >
          Discard
        </Link>
      </div>
    </form>
  );
};

export default Write;
