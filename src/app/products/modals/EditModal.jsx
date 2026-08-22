"use client";
import React, { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { GetCat } from "@/sorovlar/GetCat";
import "./modal.css";
const EditModal = ({ Edit, close }) => {
  const { editProduct } = useProducts();
  const { data } = useQuery({
    queryKey: ["cat"],
    queryFn: GetCat,
  });
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });
  useEffect(() => {
    if (Edit) {
      setFormData({
        name: Edit.name || "",
        categoryId: Edit.categoryId || Edit.category?.id || "",
        price: Edit.price || "",
        stock: Edit.stock || "",
        image: Edit.image || "",
        description: Edit.description || "",
      });
    }
  }, [Edit]);

  if (!Edit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      categoryId: Number(formData.categoryId),
      image: formData.image,
      description: formData.description,
    };
    editProduct(
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
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            required
          >
            <option value="">Category</option>
            {data?.data?.map((cat) => {
              if (cat.isActive) {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              }
              return null;
            })}
          </select>
          <input
            className="inp-a"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <input
            className="inp-a"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />
          <input
            className="inp-a"
            type="url"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
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
