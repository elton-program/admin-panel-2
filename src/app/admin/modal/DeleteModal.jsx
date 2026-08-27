import React from "react";
import "@/app/products/modals/modal.css";
const deleteModal = ({ isOpen, onConfirm, close }) => {
    if (!isOpen) return null;
  return (
    <div className="add">
      <div className="modal-a">
        <h1 style={{fontSize:"22px", marginBottom:"50px",textAlign:"center"}}>Rostan ochirmoqchimisan??????</h1>
        <div className="div-a">
          <button
          className="btn-p"
            onClick={() => {
              onConfirm()
              close()
            }}
          >
            ha
          </button>
          <button
          className="btn-p"
            onClick={() => {
              close();
            }}
          >
            yoq
          </button>
        </div>
      </div>
    </div>
  );
};

export default deleteModal;
