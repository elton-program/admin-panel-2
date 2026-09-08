"use client";
import React, { useState } from "react";
import "./salonlar.css";
import { useSalon } from "@/hooks/useSalon";
import toast, { Toaster } from "react-hot-toast";
import AddSalon from "./modal/AddSalon";
import EditSalon from "./modal/EditSalon";
import ViewSalon from "./modal/ViewSalon";

const page = () => {
  const { salon, deleteSalon, isLoading, toggleStatus } = useSalon();
  const [add, setAdd] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(null);
  console.log(salon);
  const handleDelete = (id) => {
    deleteSalon(id, {
      onSuccess: (res) => {
        toast.success(res?.message);
      },
      onError: (err) => {
        toast.error(err?.message);
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
    <div className="salon">
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
                <path d="M3 19V5.70046C3 5.27995 3.26307 4.90437 3.65826 4.76067L13.3291 1.24398C13.5886 1.14961 13.8755 1.28349 13.9699 1.54301C13.9898 1.59778 14 1.65561 14 1.71388V6.6667L20.3162 8.77211C20.7246 8.90822 21 9.29036 21 9.72079V19H23V21H1V19H3ZM5 19H12V3.85543L5 6.40089V19ZM19 19V10.4416L14 8.77488V19H19Z"></path>
              </svg>
            </div>
            <p className="p1">Pickup Points</p>
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
              <th>Image</th>
              <th>Name</th>
              <th>Products</th>
              <th>City</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Hours</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : salon?.data?.items?.length > 0 ? (
              salon?.data?.items?.map((salon) => (
                <tr key={salon.id}>
                  <td>
                    <img src={salon.imageUrl} alt={salon.name} />
                  </td>
                  <td>{salon.name}</td>
                  <td>{salon.productsCount}</td>
                  <td>{salon.city}</td>
                  <td>{salon.address}</td>
                  <td>{salon.phone}</td>
                  <td>
                    {salon.opensAt}-{salon.closesAt}
                  </td>
                  <td>
                    <button
                      className="btn-c"
                      style={{ color: salon.isActive ? "green" : "red" }}
                      onClick={() => toggle(salon)}
                    >
                      {salon.isActive ? "Active" : "InActive"}
                    </button>
                  </td>
                  <td>
                    <button className="btn-p" onClick={() => setEdit(salon)}>
                      Edit
                    </button>
                    <button
                      className="btn-p"
                      onClick={() => {
                        setView(salon);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn-p"
                      onClick={() => {
                        handleDelete(salon.id);
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
        <AddSalon Add={add} close={() => setAdd(false)} />
        <EditSalon edit={edit} close={() => setEdit(null)} />
        <ViewSalon view={view} close={() => setView(null)} />
      </div>
    </div>
  );
};

export default page;
