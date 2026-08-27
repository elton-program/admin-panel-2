"use client";
import React, { useState } from "react";
import "@/app/products/modals/modal.css";
import { useAdmin } from "@/hooks/useAdmin";
import toast, { Toaster } from "react-hot-toast";
const AddModal = ({ Add, close }) => {
  const { addAdmin } = useAdmin();
  const [formData, setFormData] = useState({
    login: "",
    fullName: "",
    password: "",
  });

  if (!Add) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addAdmin(formData, {
      onSuccess: () => {
        toast.success("successfull", {
          duration: 5000,
        });
        setFormData({
          login: "",
          fullName: "",
          password: "",
        });
        setTimeout(() => {
          close();
        }, 1500);
      },
      onError: (err) => {
        const data = err?.response?.data;
        const errors = data?.errors || [data?.message || "Xatolik yuz berdi!"];
        toast.error(errors);
      },
    });
  };

  return (
    <div className="add">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="modal-a">
        <form className="form-a" onSubmit={handleSubmit}>
          <input
            className="inp-a"
            type="text"
            placeholder="name"
            value={formData.login}
            onChange={(e) =>
              setFormData({ ...formData, login: e.target.value })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <div className="div-a">
            <button type="submit" className="btn-p">
              Add
            </button>
            <button type="button" onClick={close} className="btn-p">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddModal;
