import { Cross, Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [showburger, setshowburger] = useState(false);
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
          <a href="">
            <Heart />
          </a>
          <a href="">
            <ShoppingCart />
          </a>
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
