import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  signInFailed,
  signInStart,
  signInSuccess,
  signOutFun,
} from "../features/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Account = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileref = useRef(null);
  const [file, setFile] = useState(undefined);
  const [userData, setUserData] = useState(user ? user : {});
  const [filePerc, setFilePerc] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.patch(
        `https://blog-deploy-afnh.onrender.com/api/user/${userData._id}`,
        userData,
        {
          withCredentials: true,
        }
      );
      dispatch(signInSuccess(res.data));
    } catch (error) {
      dispatch(signInFailed(error));
    }
  };
  const signOut = () => {
    dispatch(signOutFun());
    navigate("/");
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
      console.log(userData._id);
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
          setUserData({
            ...userData,
            avatar: downloadUrl,
          });
        });
      }
    );
  };

  return (
    <div className="mt-5 w-full=">
      <form className="mx-auto max-w-md flex flex-col gap-6" action="">
        <div className="max-w-[10rem] mx-auto">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileref}
            hidden
            accept="images/*"
          />
          <img
            onClick={() => fileref.current.click()}
            className="w-full rounded-full cursor-pointer"
            src={userData.avatar}
            alt=""
          />
          <p>
            {filePerc === 100
              ? "File uploaded Successfully"
              : filePerc === 0
              ? ""
              : filePerc}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-300 py-3 px-6 rounded-lg"
              onChange={handleChange}
              value={userData.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-300 py-3 px-6 rounded-lg"
              onChange={handleChange}
              value={userData.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-bold">
              Password:
            </label>
            <input
              type="text"
              id="password"
              className="bg-gray-300 py-3 px-6 rounded-lg"
              onChange={handleChange}
            />
          </div>
          <p>{error}</p>
          <button
            disabled={loading}
            type="submit"
            className="bg-red-500 py-3 rounded-lg text-white text-xl"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <button
            type="button"
            className="bg-red-800 py-3 rounded-lg text-white text-xl"
            onClick={signOut}
          >
            SignOut
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
