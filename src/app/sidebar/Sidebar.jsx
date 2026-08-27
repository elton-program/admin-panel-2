"use client";
import React from "react";
import "./sidebar.css";
import { useRouter } from "next/navigation";
const Sidebar = () => {
  const router = useRouter();
  const LogOut = async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    router.replace("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h2>Admin</h2>
        <div className="sidebar-text">
          <div className="sidebar-disp">
            <button
              className="sidebar-btn"
              onClick={() => {
                router.replace(`/dashboard`);
              }}
            >
              <span>
                <svg
                  className="sidebar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path>
                </svg>
              </span>
              <p className="sidebar-p">Dashboard</p>
            </button>
          </div>
          <div className="sidebar-dropdown">
            <button
              className="sidebar-btn sidebar-drop-btn"
              onClick={() => {
                router.replace(`/products`);
              }}
            >
              <span className="sidebar-btn-box">
                <svg
                  className="sidebar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311L4.5 7.65311ZM12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM6.49896 9.97065L11 12.5765V17.625H13V12.5765L17.501 9.97066L16.499 8.2398L12 10.8445L7.50104 8.2398L6.49896 9.97065Z"></path>
                </svg>
                <span>Products</span>
              </span>
            </button>
          </div>
          <div className="sidebar-dropdown">
            <button
              className="sidebar-btn sidebar-drop-btn"
              onClick={() => {
                router.replace(`/categories`);
              }}
            >
              <span className="sidebar-btn-box">
                <svg
                  className="sidebar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V10C11 10.5523 10.5523 11 10 11H4C3.44772 11 3 10.5523 3 10V4ZM3 14C3 13.4477 3.44772 13 4 13H10C10.5523 13 11 13.4477 11 14V20C11 20.5523 10.5523 21 10 21H4C3.44772 21 3 20.5523 3 20V14ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V10C21 10.5523 20.5523 11 20 11H14C13.4477 11 13 10.5523 13 10V4ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14V20C21 20.5523 20.5523 21 20 21H14C13.4477 21 13 20.5523 13 20V14ZM15 5V9H19V5H15ZM15 15V19H19V15H15ZM5 5V9H9V5H5ZM5 15V19H9V15H5Z"></path>
                </svg>
                <span>Categories</span>
              </span>
            </button>
          </div>
          <div className="sidebar-dropdown">
            <button
              className="sidebar-btn sidebar-drop-btn"
              onClick={() => {
                router.replace(`/salonlar`);
              }}
            >
              <span className="sidebar-btn-box">
                <svg
                  className="sidebar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
                </svg>
                <span>Pickup Points</span>
              </span>
            </button>
          </div>
          <div className="sidebar-dropdown">
            <button
              className="sidebar-btn sidebar-drop-btn"
              onClick={() => {
                router.replace(`/admin`);
              }}
            >
              <span className="sidebar-btn-box">
                <svg
                  className="sidebar-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 18 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
                </svg>
                <span>Admins</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="sidebar-bottom">
        <button className="sidebar-logOut" onClick={LogOut}>
          <svg
            className="sidebar-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
