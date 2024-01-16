import { Cross, Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthdata } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import {
  fetchCartItems,
  fetchWishlistItems,
} from "../features/carts/cartSlice";

const Navbar = () => {
  const [showburger, setshowburger] = useState(false);

  const dispatch = useDispatch();
  const usercart = useSelector((state) => state.carts);

  useEffect(() => {
    const token = localStorage.getItem("e_token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (token && userData) {
      const data = {
        token,
        userData,
      };
      dispatch(setAuthdata(data));
      setTimeout(() => {
        dispatch(fetchCartItems(userData?._id));
        dispatch(fetchWishlistItems(userData?._id));
      }, 2000);
    }
  }, [dispatch]);

  return (
    <nav className="relative pt-4">
      <div className="flex p-4 pb-0 gap-5">
        <div className="flex-1 text-lg md:max-w-sm lg:max-w-sm font-medium md:text-2xl md:pl-10">
          Exclusive
        </div>
        <div className="flex-1 lg:flex lg:justify-around lg:items-center text-lg font-normal hidden">
          <a
            href=""
            className="border-b-2 border-transparent hover:border-b-2 hover:border-black"
          >
            Home
          </a>
          <a
            href=""
            className="border-b-2 border-transparent hover:border-b-2 hover:border-black"
          >
            Contact
          </a>
          <a
            href=""
            className="border-b-2 border-transparent hover:border-b-2 hover:border-black"
          >
            About
          </a>
          <a
            href=""
            className="border-b-2 border-transparent hover:border-b-2 hover:border-black"
          >
            Sign up
          </a>
        </div>
        <div className="flex-1 flex items-center gap-5 justify-center">
          <div className="flex">
            <input
              type="text"
              className="w-fit xs:hidden text-sm bg-slate-100 p-2 outline-none rounded-l-md"
              placeholder={`What are you looking for?`}
            />
            <button className="bg-slate-100 pr-4 rounded-r-md">
              <Search />
            </button>
          </div>
          <Link to={"/wishlist"} className="relative">
            {usercart?.wishlistData?.length > 0 && (
              <p className="count absolute top-[-20px] right-[-10px] text-white bg-red-400 border border-none h-[25px] flex items-center justify-center -z-10 w-[25px] rounded-3xl">
                {usercart?.wishlistData?.length}
              </p>
            )}
            <Heart />
          </Link>
          <Link to={"/cart"} className="relative">
            {usercart?.cartData?.length > 0 && (
              <p className="count absolute top-[-20px] right-[-10px] text-white bg-red-400 border border-none h-[25px] flex items-center justify-center -z-10 w-[25px] rounded-3xl">
                {usercart?.cartData && usercart?.cartData?.length}
              </p>
            )}
            <ShoppingCart />
          </Link>
        </div>
        <button
          className="flex-2 float-right flex items-center justify-end lg:hidden"
          onClick={() => setshowburger(true)}
        >
          <Menu />
        </button>
      </div>
      {showburger && (
        <div className="w-full z-10 bg-red-500 text-white absolute top-0 p-4">
          <button
            className="close float-right"
            onClick={() => setshowburger(false)}
          >
            <X />
          </button>
          <div className=" flex justify-center items-center h-screen">
            <div className="flex flex-col justify-between items-center gap-10">
              <a
                href=""
                className="border-b-2 text-3xl border-transparent hover:border-b-2 hover:border-black"
              >
                Home
              </a>
              <a
                href=""
                className="border-b-2 text-3xl border-transparent hover:border-b-2 hover:border-black"
              >
                Contact
              </a>
              <a
                href=""
                className="border-b-2 text-3xl border-transparent hover:border-b-2 hover:border-black"
              >
                About
              </a>
              <a
                href=""
                className="border-b-2 text-3xl border-transparent hover:border-b-2 hover:border-black"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
