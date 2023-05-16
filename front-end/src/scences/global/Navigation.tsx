import { ProSidebarProvider } from "react-pro-sidebar";
import SideBar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="app">
      <ProSidebarProvider>
        <SideBar />
      </ProSidebarProvider>
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Navigation;
