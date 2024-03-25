import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextOnlyComponent from "./TextOnlyComponent";
import Modal from "./Modal";

import { notify } from "../utils/toast";
import { Feed } from "../redux/feed.slice";

import { AppDispatch, RootState } from "../redux/store";

import {
  updateSavePostInFirestore,
  addPostToFirestore,
} from "../redux/savePost.slice";
import LoadingScreen from "./LoadingScreen";

type Props = {
  // Define your props here
  feed: Feed;
  status: string;
};

const FeedContent: React.FC<Props> = (props) => {
  // Component logic goes here
  console.log(props);

  const dispatch: AppDispatch = useDispatch();

  const savePost = useSelector((state: RootState) => state.savePost);
  const user = useSelector((state: RootState) => state.auth.user);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSelectedPostUrl, setIsSelectedPostUr] = useState("");

  const shareToFacebook = (url: string) => {
    console.log("SHARE FB", url);
    // window.FB.ui(
    //   {
    //     method: "share",
    //     href: url,
    //   },
    //   function (response: string) {
    //     console.log(response);
    //   }
    // );
  };

  const handleSave = async (link: string) => {
    const post = props.feed.post.find((p) => p.link === link);
    if (post) {
      await dispatch(
        addPostToFirestore({
          data: { posts: [...savePost.posts, post] },
          uid: user?.uid,
        })
      );
      notify("Post saved successfully", "success");
    } else {
      notify("Failed to save post", "error");
    }
    console.log("saved");
  };

  const handleUnSave = async (link: string) => {
    const filteredPosts = savePost.posts.filter((p) => p.link !== link);
    await dispatch(
      updateSavePostInFirestore({
        data: { posts: filteredPosts },
        uid: user?.uid,
      })
    );
    notify("Post unsaved successfully", "success");
    console.log("unsaved");
  };

  const isSaved = (link: string) => {
    if (savePost.posts) {
      return savePost.posts.find((p) => p.link === link);
    }
    return false;
  };

  return (
    <div className="flex justify-center">
      {savePost.status === "loading" && <LoadingScreen />}
      {isShareModalOpen && (
        <Modal
          title="Share to"
          isShow={isShareModalOpen}
          setIsShow={setIsShareModalOpen}
          children={
            <ul className="font-medium flex">
              <li>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(isSelectedPostUrl);
                    notify("Link copied to clipboard", "success");
                  }}
                  className="cursor-pointer sm:flex-col flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100  group"
                >
                  <svg
                    className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />{" "}
                  </svg>
                  <p className="flex-1 whitespace-nowrap text-sm mx-4">
                    Copy link
                  </p>
                  {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    shareToFacebook(isSelectedPostUrl);
                  }}
                  className="cursor-pointer sm:flex-col flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    className="flex-shrink-0 w-8 h-8 text-gray-500 transition duration-75  group-hover:text-blue-600 "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    fill="currentColor"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />{" "}
                  </svg>
                  <p className="flex-1 whitespace-nowrap text-sm mx-4">
                    Facebook
                  </p>
                  {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                </div>
              </li>
            </ul>
          }
        />
      )}
      <div className="w-4/5">
        {props.status === "loading" && <p>Loading...</p>}
        {props.status === "failed" && <p>Failed to load feeds</p>}
        {props.status === "succeeded" && (
          <ul>
            {props.feed.post.map((post) => (
              <li className="border-b-2 p-4 hover:bg-gray-50 cursor-pointer">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg mb-4 inline-block font-medium text-gray-900  hover:text-blue-500 "
                >
                  {post.title}
                </a>
                {/* <p
                    className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                  >{post.description}</p> */}
                <div>
                  <TextOnlyComponent html={post.description} />
                </div>
                <div className="flex justify-between mt-6 items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      {props.feed?.image !== "" ? (
                        <img
                          src={props.feed?.image}
                          alt={props.feed?.title}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-5 h-5 text-blue-600  mx-auto "
                          fill="currentColor"
                        >
                          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />{" "}
                        </svg>
                      )}

                      <span className="flex-1 ms-1 whitespace-nowrap">
                        {props.feed?.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600  font-semibold">
                      {new Date(
                        new Date().getTime() - new Date(post.pubDate).getTime()
                      ).getHours()}{" "}
                      min
                    </span>
                  </div>
                  <div className="flex items-center">
                    {!isSaved(post.link) ? (
                      <div
                        onClick={() => handleSave(post.link)}
                        className="mr-8 p-2 rounded-full hover:bg-gray-200 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          className="w-6 h-6 text-gray-500 group-hover:text-blue-600"
                          fill="currentColor"
                        >
                          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
                        </svg>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleUnSave(post.link)}
                        className="mr-8 p-2 rounded-full hover:bg-gray-200 group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                          className="w-6 h-6 text-gray-500 group-hover:text-blue-600"
                          fill="currentColor"
                        >
                          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />{" "}
                        </svg>
                      </div>
                    )}
                    <div
                      onClick={() => {
                        setIsSelectedPostUr(post.link);
                        setIsShareModalOpen(true);
                      }}
                      className="p-2 rounded-full hover:bg-gray-200 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-6 h-6 text-gray-500 group-hover:text-blue-600"
                        fill="currentColor"
                      >
                        <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeedContent;
