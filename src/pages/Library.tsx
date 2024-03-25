import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { updateDocInFirestore } from "../redux/feeds.slice";
import { notify } from "../utils/toast";

import { FeedCard } from "../components/FeedCard";
import { Feed } from "../redux/feed.slice";

export default function Library() {

  const dispatch: AppDispatch = useDispatch();

  const { feeds, status } = useSelector((state: RootState) => state.feeds);

  const { user } = useSelector((state: RootState) => state.auth);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("followed");
  };

  const handleUnFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    feed: Feed
  ) => {
    e.preventDefault();
    const filteredFeeds = [...feeds].filter(
      (f) => f.link !== feed.link
    );
    await dispatch(
      updateDocInFirestore({
        data: { feeds: filteredFeeds },
        uid: user?.uid,
      })
    );
    if (status === "succeeded") {
      notify("Feed updated successfully", "success");
      // dispatch(addFeed(feed));
    } else if (status === "failed") {
      notify("Failed to update feed", "error");
    }
  };

  return (
    <div 
       className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {feeds.map((feed) => (
        <FeedCard key={feed.link} feed={feed} handleFollow={handleFollow} handleUnFollow={handleUnFollow} />
      ))}
    </div>
  );
}
