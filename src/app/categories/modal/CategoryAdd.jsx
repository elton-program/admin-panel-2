"use client";
import React, { useState } from "react";
import "@/app/products/modals/modal.css"
import { useCategory } from "@/hooks/useCategory";
const AddModal = ({ Add, close }) => {
  const { addCategory } = useCategory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  if (!Add) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          description: "",
        });
        close();
      },
    });
  };

  return (
    <div className="add">
      <div className="modal-a">
        <form className="form-a" onSubmit={handleSubmit}>
          <input
            className="inp-a"
            type="text"
            placeholder="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
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
