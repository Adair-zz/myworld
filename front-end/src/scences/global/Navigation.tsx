import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
