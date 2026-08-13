"use client";
import React from "react";
import "./sidebar.css";
import { useRouter } from "next/navigation";
const Sidebar = () => {
    const router = useRouter();    
  return (
    <div className="sidebar">
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
      </div>
    </div>
  );
};

export default Sidebar;
