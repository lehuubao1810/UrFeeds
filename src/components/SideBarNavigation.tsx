import React, { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth.slice";
import { Link } from "react-router-dom";

import { AppDispatch } from "../redux/store";
import { removeAllFeeds } from "../redux/feeds.slice";
import { resetFeed } from "../redux/feed.slice";
import { resetSavePost } from "../redux/savePost.slice";

import { Overlay } from "./Overlay";

type Props = {
  // Define your props here
};

const SideBarNavigation: React.FC<Props> = (props) => {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [isShowOverlay, setIsShowOverlay] = useState(false);


  console.log(props);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = async () => {
    // Clear persisted data
    dispatch(removeAllFeeds());
    dispatch(resetFeed());
    dispatch(resetSavePost());

    // Logout user
    dispatch(logoutUser());
  };

  const handleSideBar = () => {
    const element = sideBarRef.current;
    if (element) {
      if (element.classList.contains("-translate-x-full")) {
        element.classList.remove("-translate-x-full");
      } else {
        element.classList.add("-translate-x-full");
      }
      setIsShowOverlay(!isShowOverlay);
    }
  };

  return (
    <div className="z-50">
      {isShowOverlay && (
        <Overlay
          status={isShowOverlay}
          setStatus={setIsShowOverlay}
          action={handleSideBar}
        />
      )}
      <button
        type="button"
        onClick={handleSideBar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        ref={sideBarRef}
        onClick={() => {
          const element = sideBarRef.current;
          if (element) {
            element.classList.add("-translate-x-full");
            setIsShowOverlay(false);
          }
        }}
        className="fixed top-0 left-0 z-40 sm:w-20 w-72 h-screen transition-transform sm:translate-x-0 border-r-2 -translate-x-full" // -translate-x-full
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50  flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/"}
                className="sm:flex-col flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 d group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  fill="currentColor"
                >
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
                <p className="flex-1 whitespace-nowrap text-sm mx-4">Home</p>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </Link>
            </li>
            <li className="border-b-2 pb-2">
              <Link
                to={"/library"}
                className="sm:flex-col flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900"
                  fill="currentColor"
                >
                  <path d="M32 32H480c17.7 0 32 14.3 32 32V96c0 17.7-14.3 32-32 32H32C14.3 128 0 113.7 0 96V64C0 46.3 14.3 32 32 32zm0 128H480V416c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V160zm128 80c0 8.8 7.2 16 16 16H336c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z" />
                </svg>
                <p className="flex-1 whitespace-nowrap text-sm mx-4">Library</p>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </Link>
            </li>
            <li>
              <Link
                title="Add feed"
                to={"/add"}
                className="sm:flex-col flex items-center p-2 text-gray-900  group group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="flex-shrink-0 sm:w-8 sm:h-8 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900"
                  fill="currentColor"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                </svg>
                <p className="flex-1 whitespace-nowrap text-sm mx-4 sm:hidden block">
                  Add feed
                </p>
              </Link>
              <p className="flex-1 whitespace-nowrap text-sm hidden sm:block">
                Add feed
              </p>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={handleLogout}
                href="#"
                className="sm:flex-col flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <p className="flex-1 whitespace-nowrap text-sm mx-4">Log out</p>
                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBarNavigation;
