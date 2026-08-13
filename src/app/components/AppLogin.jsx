"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./AppLogin.css";
const AppLogin = () => {
  const router = useRouter();

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      console.log("Login yoki parol bo'sh bo'lishi mumkin emas!");
      return;
    }

    fetch("https://backend.magnateshop.uz/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: formData.login,
        password: formData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data?.data?.accessToken;
        if (token) {
          localStorage.setItem("access_token", token);
          router.replace("/dashboard");
          router.refresh();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
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
          Login
        </button>
      </form>
    </div>
  );
};

export default AppLogin;
