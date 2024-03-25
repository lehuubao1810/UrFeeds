
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import FeedContent from "../components/FeedContent";

export default function AllPost() {
  const { feeds } = useSelector((state: RootState) => state.feeds);

  return <div>
    {
      feeds.map((feed) => (
        <FeedContent key={feed.link} feed={feed} status="succeeded"/>
      ))
    }
  </div>;
}
