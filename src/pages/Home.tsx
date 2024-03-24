
import { Outlet } from "react-router-dom";
import SideBarNavigation from "../components/SideBarNavigation";


export default function HomePage() {


    return (
        <div className="flex-initial">
            <SideBarNavigation/>
            <Outlet />
        </div>
    );
}