import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import FeedContent from "../components/FeedContent";
import LoadingScreen from "../components/LoadingScreen";

export default function Feed() {
  const { feed, status } = useSelector((state: RootState) => state.feed);

  return (
    <div>
      {status === "loading" && <LoadingScreen />}
      <FeedContent feed={feed} status={status} />
    </div>
  );
}
