"use client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./AppLogin.css";
const AppLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      setMessege("Login yoki parol bo'sh bo'lishi mumkin emas!");
      toast.error("Login yoki parol bo'sh bo'lishi mumkin emas!");
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
      }

      const token = data?.data?.accessToken;
      if (token) {
        localStorage.setItem("access_token", token);
        window.location.href = "/dashboard";
      } else {
        console.log("something");
      }
    } catch (error) {
      setMessege(error.message);
      toast.error(messege);
      localStorage.removeItem("access_token");
    } finally {
      setLoading(false);
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
        <button type="submit" className="btn">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AppLogin;
