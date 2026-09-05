import React from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="navbar">
      <h1>
        {pathname == "/products"
          ? "Products"
          : pathname == "/dashboard"
            ? "Dashboard"
            : pathname == "/admin"
              ? "Admin"
              : pathname == "/categories"
                ? "Categories"
                : "Salonlar"}
      </h1>
    </div>
  );
};

export default Navbar;
