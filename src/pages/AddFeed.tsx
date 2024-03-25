import { Link, Outlet } from "react-router-dom";

export default function AddFeedPage() {


  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800  text-center mt-4 mb-16">
        Add feeds
      </h1>
      <div className="flex justify-around mb-16">
        <Link
          to={"/add/rss"}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group border-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-10 h-10 text-blue-600  mx-auto"
            fill="currentColor"
          >
            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />{" "}
          </svg>
          <p className="mx-4 font-semibold">Add from RSS feed</p>
        </Link>
        <Link
          to={"/add/import"}
          className="flex items-center p-4 text-gray-900 rounded-lg  hover:bg-gray-100  group border-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-10 h-10 text-yellow-600  mx-auto "
            fill="currentColor"
          >
            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />{" "}
          </svg>
          <p className="mx-4 font-semibold">Import from file</p>
        </Link>
      </div>
      <div className="flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
