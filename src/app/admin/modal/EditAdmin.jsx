"use client";
import React, { useState, useEffect } from "react";
import "@/app/products/modals/modal.css";
import { useAdmin } from "@/hooks/useAdmin";
const EditModal = ({ Edit, close }) => {
  const { editAdmin } = useAdmin();
  const [formData, setFormData] = useState({
    login: "",
    fullName: "",
    password: "",
  });
  useEffect(() => {
    if (Edit) {
      setFormData({
        login: Edit.login || "",
        fullName: Edit.fullName || "",
        password: "",
      });
    }
  }, [Edit]);

  if (!Edit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      login: formData.login,
      fullName: formData.fullName,
    };
    editAdmin(
      { id: Edit.id, data: payload },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <div className="add">
      <div className="modal-a">
        <form className="form-a" onSubmit={handleSubmit}>
          <input
            className="inp-a"
            type="text"
            placeholder="login"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
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
              Save
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

export default EditModal;
