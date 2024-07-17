import { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaHistory, FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  // const [isAdmin] = useAdmin();
  const role = "user";
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
          {/* {role === "agent" && (
            <>
              <li>
                <NavLink to="/analytics">
                  <MdAnalytics />
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <ImProfile />
                  Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/registerCamps">
                  <MdAppRegistration />
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink to="/paymentHistory">
                  <MdOutlinePayment />
                  Payment History
                </NavLink>
              </li>
            </>
          )} */}
          {/* Shared nav links */}
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
