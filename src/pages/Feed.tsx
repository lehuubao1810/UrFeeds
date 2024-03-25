import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import FeedContent from "../components/FeedContent";

export default function Feed() {
  const { feed, status } = useSelector((state: RootState) => state.feed);

  return <div>
    <FeedContent feed={feed} status={status} />
  </div>;
}