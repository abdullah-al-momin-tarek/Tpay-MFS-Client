import { useState } from "react";
import { AiTwotoneFileText } from "react-icons/ai";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaHistory, FaHome, FaUserCog } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  // const [isAdmin] = useAdmin();
  const role = "agent";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile menu button */}
      <div className="lg:hidden p-4 bg-orange-300">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white flex items-center gap-2"
        >
          <TiThMenu /> {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
      </div>

      {/* Dashboard sidebar */}
      <div
        className={`w-full lg:w-64 bg-orange-400 lg:block ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <ul className="menu p-4">
          {role === "user" && (
            <>
              <li>
                <NavLink to="/overview">
                  <FaHome /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/sendMoney">
                  <BsFillSendArrowUpFill />
                  Send Money
                </NavLink>
              </li>
              <li>
                <NavLink to="/cashOut">
                  <IoIosLogOut />
                  Cash Out
                </NavLink>
              </li>
              <li>
                <NavLink to="/cashIn">
                  <IoArrowDownCircleOutline />
                  Cash In
                </NavLink>
              </li>
              <li>
                <NavLink to="/history">
                  <FaHistory />
                  Transaction History
                </NavLink>
              </li>
            </>
          )}
          {role === "agent" && (
            <>
              <li>
                <NavLink to="/overview">
                  <FaHome /> Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <AiTwotoneFileText />
                  Manage Transaction
                </NavLink>
              </li>
              <li>
                <NavLink to="/history">
                  <FaHistory />
                  Transaction History
                </NavLink>
              </li>
            </>
          )}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="/overview">
                  <FaHome /> Overview
                </NavLink>
              </li>

              <li>
                <NavLink to="/userManage">
                  <FaUserCog /> User Management
                </NavLink>
              </li>

              <li>
                <NavLink to="/systemMomitor">
                  <GrSystem /> System Monitor
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
