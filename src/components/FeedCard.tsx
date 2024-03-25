import { Feed } from "../redux/feed.slice";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

type Props = {
  feed: Feed;
  handleFollow: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUnFollow: (e: React.MouseEvent<HTMLButtonElement>, feed: Feed) => void;
};

export const FeedCard: React.FC<Props> = (props) => {
  const { feeds } = useSelector((state: RootState) => state.feeds);

  const isFollowed = feeds.find((f) => f.link === props.feed?.link);

  return (
    <div className="p-4 border-2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg truncate mr-4">{props.feed?.title}</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (!isFollowed) {
              props.handleFollow(e);
            } else {
              props.handleUnFollow(e, props.feed);
            }
          }}
          type="button"
          className={`text-white rounded-lg px-3 py-1.5 font-semibold text-sm flex justify-center items-center ${
            isFollowed ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          {!isFollowed ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 inline-block mr-1 text-white"
                fill="currentColor"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
              <p>Follow</p>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4 inline-block mr-1 text-white"
                fill="currentColor"
              >
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />{" "}
              </svg>
              <p>Following</p>
            </>
          )}
        </button>
      </div>
      <div className="flex gap-8">
        {/* <div className="bg-gray-100 p-3 rounded-lg">
                  <h3 className="font-bold text-gray-600">26</h3>
                  <p className="text-sm font-semibold text-gray-500">
                    posts/day
                  </p>
                </div> */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="font-bold text-gray-600">
            {new Date(
              new Date().getTime() -
                new Date(props.feed?.post[0].pubDate).getTime()
            ).getMinutes()}{" "}
            minutes ago
          </h3>
          <p className="text-sm font-semibold text-gray-500">updated</p>
        </div>
      </div>
      <ul className="mt-4 text-sm list-disc pl-5 font-medium text-gray-500">
        {/* {feed?.post.splice(0, 3).map((post) => (
                  <li>
                    {post.title}
                    <span className="text-xs text-gray-600 ml-2">
                      {new Date(post.pubDate).getHours()}
                    </span>
                  </li>
                ))} */}
        <li>
          {props.feed?.post[0].title}
          <span className="text-xs text-gray-600 ml-2">
            {new Date(props.feed?.post[0].pubDate).toTimeString().slice(0, 5)}
          </span>
        </li>
        <li>
          {props.feed?.post[1].title}
          <span className="text-xs text-gray-600 ml-2">
            {new Date(props.feed?.post[1].pubDate).toTimeString().slice(0, 5)}
          </span>
        </li>
        <li>
          {props.feed?.post[2].title}
          <span className="text-xs text-gray-600 ml-2">
            {new Date(props.feed?.post[2].pubDate).toTimeString().slice(0, 5)}
          </span>
        </li>
      </ul>
    </div>
  );
};
