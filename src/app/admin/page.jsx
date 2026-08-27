"use client";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Admin.css";
import { useAdmin } from "@/hooks/useAdmin";
import AddModal from "./modal/AddAdmin";
import EditModal from "./modal/EditAdmin";
import ChangeModal from "./modal/ChangeAdmin";
import DeleteModal from "./modal/DeleteModal";

const page = () => {
  const { admin, isLoading, deleteAdmin } = useAdmin();
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(null);
  const [change, setChange] = useState(null);
  const [oddiyAd, setOddiyAd] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const handleDelete = (id) => {
    deleteAdmin(id, {
      onSuccess: (res) => {
        toast.success(res?.message || "Ochirildi!");
      },
      onError: (err) => {
        toast.error(err?.message || "Xatolik yuz berdi!");
      },
    });
  };
  useEffect(() => {
    const user = localStorage.getItem("user_info");
    if (user) {
      try {
        const userAd = JSON.parse(user);
        console.log(userAd);
        setOddiyAd(userAd);
      } catch (e) {
        console.error("xato", e);
      }
    }
  }, []);
  const SuperAd = Boolean(oddiyAd?.isSuperAdmin || oddiyAd?.is_super_admin);
  return (
    <div className="admin">
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
                <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21 17H22V22H14V17H15V16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16V17ZM19 17V16C19 15.4477 18.5523 15 17 15C17.4477 15 17 15.4477 17 16V17H19Z"></path>
              </svg>
            </div>
            <p className="p1">Admins</p>
          </div>
          {SuperAd ? (
            <button className="btn-p" onClick={() => setAdd(true)}>
              Add +
            </button>
          ) : (
            <button
              className="btn-p"
              style={{ width: "170px" }}
              onClick={() => setChange(true)}
            >
              Change Password
            </button>
          )}
        </div>
      </div>

      <div className="div-c">
        <table className="table-p">
          <thead>
            <tr>
              <th>Login</th>
              <th>Full-Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : admin?.data?.items?.length > 0 ? (
              admin?.data?.items?.map((item) => {
                const isSelf =
                  oddiyAd?.id === item?.id || oddiyAd?.login === item?.login;
                return (
                  <tr key={item.id}>
                    <td>{item.login}</td>
                    <td>{item.fullName}</td>
                    <td>{item.isSuperAdmin ? "Super-Admin" : "Admin"}</td>
                    <td className="action">
                      {SuperAd && !isSelf ? (
                        <button className="btn-p" onClick={() => setEdit(item)}>
                          Edit
                        </button>
                      ) : (
                        <button
                          className="btn-p"
                          style={{ opacity: "0.3" }}
                          title="Siz buni qila olmaysiz!"
                          disabled={true}
                        >
                          Edit
                        </button>
                      )}
                      {SuperAd && !isSelf ? (
                        <button
                          className="btn-p"
                          onClick={() => {
                            setSelectedId(item.id);
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btn-p"
                          style={{ opacity: "0.3" }}
                          title={"Siz buni qila olmaysiz!"}
                          disabled={true}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Malumot topilmadi
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <AddModal Add={add} close={() => setAdd(false)} />
        <EditModal Edit={edit} close={() => setEdit(null)} />
        <DeleteModal
          isOpen={Boolean(selectedId)}
          onConfirm={() => handleDelete(selectedId)}
          close={() => setSelectedId(null)}
        />
        <ChangeModal Change={change} close={() => setChange(null)} />
      </div>
    </div>
  );
};

export default page;
//tayyor faqat yangi modul qoldi