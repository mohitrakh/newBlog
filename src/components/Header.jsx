import { BsPencilSquare } from "react-icons/bs";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <header className="flex justify-between items-center">
      <Link to="/" className="logo text-red-500 font-bold text-2xl">
        MyBlog
      </Link>
      {!user ? (
        <nav className="flex text-[1rem] gap-3">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      ) : (
        <div className="flex items-center gap-4">
          <Link to={`/${user.username}`} className="order-2">
            <img className="rounded-full w-9 h-9" src={user.avatar} alt="" />
          </Link>
          <Link className="text-2xl order-1" to={"/write"}>
            <BsPencilSquare />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
