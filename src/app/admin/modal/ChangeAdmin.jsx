"use client";
import React, { useState, useEffect } from "react";
import "@/app/products/modals/modal.css";
import { useAdmin } from "@/hooks/useAdmin";
const ChangeModal = ({ Change, close }) => {
  const { changeAdmin } = useAdmin();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  useEffect(() => {
    if (Change) {
      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [Change]);

  if (!Change) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    changeAdmin(
      {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          setFormData({ currentPassword: "", newPassword: "" });
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
            placeholder="currentPassword"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="newPassword"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
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

export default ChangeModal;
