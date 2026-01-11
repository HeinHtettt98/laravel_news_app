import { LuTextSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserProfileComponent from "./UserProfileComponent";

const NavBar = () => {
  const { name, photo } = useSelector((state) => state.user);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOnKeyUp = (e) => {
    nav(`/?search=${e.target.value}`);
  };
  console.log("first", name == "");
  return (
    <div className="bg-white z-30 fixed w-full top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="absolute flex items-center gap-2 overflow-hidden">
          {/* 🔍 Animated Input */}
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: -500 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative flex w-full"
              >
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  onKeyUp={handleOnKeyUp}
                  className="px-3 py-2.5 bg-neutral-secondary-medium border border-blue-500 rounded-xl ps-9 text-heading text-sm focus:ring-blue-400 focus:border-blue-400 block w-full placeholder:text-body"
                  placeholder="Search branch name..."
                  autoFocus
                />
                <motion.button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  // animate={{
                  //   scale: open ? 0 : 1,
                  // }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center shrink-0 bg-brand hover:bg-brand-strong shadow-xs rounded-base w-10 h-10"
                >
                  <LuTextSearch className="w-6 h-6 text-blue-500" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="inline-flex items-center justify-center shrink-0 bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-10 h-10 focus:outline-none"
              >
                <LuTextSearch className="w-6 h-6 text-blue-500" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <div></div>
        <Link to="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-bold text-blue-500 text-heading whitespace-nowrap">
            B B C
          </span>
        </Link>
        {name !== "" ? (
          <UserProfileComponent />
        ) : (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => nav("/register")}
              className="text-blue-500 bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => nav("/login")}
              className="text-white bg-blue-500 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
