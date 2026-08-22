"use client";
import React, { useState, useEffect } from "react";
import "@/app/products/modals/modal.css"
import { useCategory } from "@/hooks/useCategory";
const EditModal = ({ Edit, close }) => {
  const { editCategory } = useCategory();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    if (Edit) {
      setFormData({
        name: Edit.name || "",
        description: Edit.description || "",
      });
    }
  }, [Edit]);

  if (!Edit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
    };
    editCategory(
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
            placeholder="Name"
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
