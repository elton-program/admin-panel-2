"use client";
import { useProducts } from "@/hooks/useProducts";
import { GetCat } from "@/sorovlar/GetCat";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import "./modal.css"
const AddModal = ({ Add, close }) => {
  const { addProduct } = useProducts();
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

  if (!Add) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          categoryId: "",
          price: "",
          stock: "",
          image: "",
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
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            required
          >
            <option value="">Category</option>
            {data?.data?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            className="inp-a"
            type="number"
            placeholder="price"
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
