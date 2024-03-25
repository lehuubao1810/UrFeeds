import { Outlet } from "react-router-dom";
import SideBarNavigation from "../components/SideBarNavigation";
import SideBarFeed from "../components/SideBarFeed";




export default function HomePage() {
  return (
    // <div classNameName="flex-initial">
    //     <SideBarNavigation/>
    //     <Outlet />
    // </div>
    <div className="">
      <SideBarNavigation />
      <SideBarFeed />
      <div className="p-4 sm:ml-80">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 min-h-screen">
          <Outlet />
        </div>
      </div>     
    </div>
  );
}
