"use client";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";
import "./AppLogin.css";
const AppLogin = () => {
  const [loading, setLoading] = useState(false);
  const [messege, setMessege] = useState("");
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessege("");

    if (!formData.login || !formData.password) {
      setMessege("Login yoki parol bosh bo'lishi mumkin emas!");
      toast.error("Login yoki parol bosh bo'lishi mumkin emas!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("https://backend.magnateshop.uz/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const mes = data?.message || data?.error || "Login yoki parol xato!";
        toast.error(mes);
        return;
      }
      console.log(data);

      const token = data?.data?.accessToken;
      const adminData = data?.data?.admin;

      if (token && adminData) {
        const isSuper =
          adminData.fullName?.toLowerCase().includes("bosh admin") ||
          adminData.login === "admin";
        const user = {
          ...adminData,
          isSuperAdmin: isSuper,
        };
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_info", JSON.stringify(user));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setMessege(error.message);
      toast.error(messege);
      localStorage.removeItem("access_token");
    }
  };

  return (
    <div className="login">
      <Toaster position="top-right" reverseOrder={false} />
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          name="login"
          className="inp"
          placeholder="Login"
          value={formData.login}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="inp"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button style={{color:"white"}} type="submit" className="btn">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AppLogin;
