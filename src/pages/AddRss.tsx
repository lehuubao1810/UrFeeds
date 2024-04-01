import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";
import { addFeedsToFirestore, updateDocInFirestore } from "../redux/feeds.slice";
import { Feed, fetchFeedFromRSS } from "../redux/feed.slice";

import { FeedCard } from "../components/FeedCard";

import { notify } from "../utils/toast";
import LoadingScreen from "../components/LoadingScreen";

export default function AddRss() {
  const dispatch: AppDispatch = useDispatch();
  const { feed, status } = useSelector((state: RootState) => state.feed);
  const feeds = useSelector((state: RootState) => state.feeds);
  const { user } = useSelector((state: RootState) => state.auth);

  const [rssURL, setRssURL] = useState("");
  // const [isAvailableFeed, setIsAvailableFeed] = useState(false);

  const handleSearch = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await dispatch(fetchFeedFromRSS(rssURL));
    if (status === "idle") {
      // setIsAvailableFeed(true);
      console.log(feed);
    } else if (status === "failed") {
      // setIsAvailableFeed(false);
      notify("Invalid RSS feed URL", "error");
    }
  };

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>    
  ) => {
    e.preventDefault();
    console.log([...feeds.feeds, feed]);
    await dispatch(
      addFeedsToFirestore({
        data: { feeds: [...feeds.feeds, feed] },
        uid: user?.uid,
      })
    );
    if (feeds.status === "succeeded") {
      notify("Feed added successfully", "success");
      // dispatch(addFeed(feed));
    } else if (feeds.status === "failed") {
      notify("Failed to add feed", "error");
    }
  };

  const handleUnFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feed: Feed
  ) => {
    e.preventDefault();
    const filteredFeeds = [...feeds.feeds].filter(
      (f) => f.link !== feed.link
    );
    await dispatch(
      updateDocInFirestore({
        data: { feeds: filteredFeeds },
        uid: user?.uid,
      })
    );
    if (feeds.status === "succeeded") {
      notify("Feed updated successfully", "success");
      // dispatch(addFeed(feed));
    } else if (feeds.status === "failed") {
      notify("Failed to update feed", "error");
    }
  };


  return (
    <div className="sm:w-4/5">
      {status === "loading" || feeds.status === "loading" && <LoadingScreen />}
      <div className="p-6 bg-gray-100 rounded-lg mb-6">
        <h1 className="font-bold mb-4">Enter feed's address</h1>
        <form action="" className="flex">
          <input
            type="text"
            value={rssURL}
            onChange={(e) => setRssURL(e.target.value)}
            placeholder="https://example.com/rss"
            className="border-2 border-gray-400 rounded-lg  p-2 w-full mr-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </form>
      </div>
      {status === "succeeded" && (
        <div>
          <h1 className="font-semibold mb-4 text-lg">Available feeds</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FeedCard feed={feed} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />
          </div>
          
        </div>
      )}

      {(status === "idle" || status === "failed") && (
        <div className="flex flex-col items-center mt-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="w-12 h-12 text-gray-400  mb-4"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
          <p className="text-gray-500 font-semibold">
            Available feeds will show up here.
          </p>
        </div>
      )}
    </div>
  );
}
