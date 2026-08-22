"use client";
import React, { useState } from "react";
import "./categories.css";
import { useCategory } from "@/hooks/useCategory";
import CategoryAdd from "./modal/CategoryAdd";
import CategoryEdit from "./modal/CategoryEdit";
import toast, { Toaster } from "react-hot-toast";
const page = () => {
  const { category, deleteCategory, isLoading, editCategory, toggleStatus } =
    useCategory();
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(null);
  console.log(category?.data.items);
  const handleDelete = (id) => {
    deleteCategory(id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Kategoriya muvaffaqiyatli o'chirildi!");
      },
      onError: (err) => {
        toast.error("Avtomobillari bor Categoriyani ochira olmaysiz!");
      },
    });
  };
  const toggle = (item) => {
    const newStatus = !item.isActive;

    toggleStatus(
      { id: item.id, isActive: newStatus },
      {
        onSuccess: () =>
          toast.success(
            `Status ${newStatus ? "Active" : "InActive"} ga ozgardi!`,
          ),
        onError: (err) => toast.error(err.message),
      },
    );
  };
  return (
    <div className="categories">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="block-p">
        <div className="box2-p a">
          <div className="disp">
            <div className="box-p">
              <svg
                className="icon1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.9998 1L6 11H18L11.9998 1ZM11.9998 4.8873L14.4676 9H9.53232L11.9998 4.8873ZM6.75 20C5.23122 20 4 18.7688 4 17.25C4 15.7312 5.23122 14.5 6.75 14.5C8.26878 14.5 9.5 15.7312 9.5 17.25C9.5 18.7688 8.26878 20 6.75 20ZM6.75 22C9.37335 22 11.5 19.8734 11.5 17.25C11.5 14.6266 9.37335 12.5 6.75 12.5C4.12665 12.5 2 14.6266 2 17.25C2 19.8734 4.12665 22 6.75 22ZM15 15.5V19.5H19V15.5H15ZM13 21.5V13.5H21V21.5H13Z"></path>
              </svg>
            </div>
            <p className="p1">Categories </p>
          </div>

          <button className="btn-p" onClick={() => setAdd(true)}>
            Add +
          </button>
        </div>
      </div>
      <div className="div-c">
        <table className="table-p">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Products-Count</th>
              <th>Stats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : category?.data?.items?.length > 0 ? (
              category?.data?.items?.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.productsCount}</td>
                  <td>
                    <button
                      className="btn-c"
                      style={{ color: category.isActive ? "green" : "red" }}
                      onClick={() => toggle(category)}
                    >
                      {category.isActive ? "Active" : "InActive"}
                    </button>
                  </td>
                  <td>
                    <button className="btn-p" onClick={() => setEdit(category)}>
                      Edit
                    </button>
                    <button
                      className="btn-p"
                      onClick={() => {
                        handleDelete(category.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: "center" }}>Malumot topilmadi</td>
              </tr>
            )}
          </tbody>
        </table>
        <CategoryAdd Add={add} close={() => setAdd(false)} />
        <CategoryEdit Edit={edit} close={() => setEdit(null)} />
      </div>
    </div>
  );
};

export default page;
