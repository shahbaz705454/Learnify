import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div className="absolute md:relative">
        <button
          className="md:hidden p-2 text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <AiOutlineClose fontSize={24} />
          ) : (
            <BiMenuAltLeft fontSize={24} />
          )}
        </button>
        <div
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={toggleSidebar}
        >
          <div
            className={`absolute left-0 top-14 h-full w-64 bg-white transition-transform duration-300 ${
              isSidebarOpen ? "transform-none" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </div>
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;