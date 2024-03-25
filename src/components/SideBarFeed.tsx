import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { RootState, AppDispatch } from "../redux/store";
import { getFeedsFromFirestore } from "../redux/feeds.slice";

import { fetchFeedFromRSS } from "../redux/feed.slice";

type Props = {
  // Define your props here
};

const SideBarFeed: React.FC<Props> = (props) => {
  // Component logic goes here
  console.log(props);

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const { feeds } = useSelector((state: RootState) => state.feeds);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  // console.log(feeds, status);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFeedsFromFirestore(user?.uid));
    }
  }, [isAuthenticated, user?.uid, dispatch]);

  return (
    <aside
      id="sidebar-feed"
      className="fixed top-0 left-20 z-40 w-60 h-screen transition-transform translate-x-feed sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={"/all"}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              >
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">All posts</span>
              {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
            </Link>
          </li>
          {/* <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              >
                <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Unread</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </a>
          </li> */}
          <li className="border-b-2 pb-4">
            <Link
              to={'/saved'}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="flex-shrink-0 w-5 h-5    text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
              >
                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Saved</span>
            </Link>
          </li>
          {feeds?.map((feed, index) => (
            <li key={index}>
              <a
                onClick={async (e) => {
                  e.preventDefault();
                  console.log("feed", feed.url); // link feed
                  await dispatch(fetchFeedFromRSS(feed.url));
                  navigate("/feed");
                }}
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {feed?.image !== "" ? (
                  <img
                    src={feed?.image}
                    alt={feed?.title}
                    className="w-5 h-5 rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 text-blue-600 dark:text-gray-400 mx-auto "
                    fill="currentColor"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />{" "}
                  </svg>
                )}
                <span className="flex-1 ms-3 truncate">
                  {feed?.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBarFeed;
