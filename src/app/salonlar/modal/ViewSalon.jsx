"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import "@/app/products/modals/modal.css";
import { ViewSalon } from "@/sorovlar/GetSalon";
const SalonMap = dynamic(() => import("./SalonMap"), {
  ssr: false,
});
const ViewModal = ({ view, close }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["salon-detail", view?.id],
    queryFn: () => ViewSalon(view.id),
    enabled: !!view?.id,
  });
  if (!view) return null;
  const salon = data?.data || data;
  if (isLoading) {
    return (
      <div className="add">
        <div className="modal-a sal">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  const position = {
    lat: Number(salon.latitude),
    lng: Number(salon.longitude),
  };

  return (
    <div className="add">
      <div
        className="modal-a sal"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <h1 style={{fontWeight:"600"}}>{salon.name}</h1>

        <div className="view-info">
          <p>City: {salon.city}</p>
          <p>Address: {salon.address}</p>
          <p>Phone: {salon.phone}</p>
          <p>
            Hours: {salon.opensAt} - {salon.closesAt}
          </p>
          <p>Status: {salon.isActive ? "Active" : "InActive"}</p>
        </div>
        <SalonMap position={position} onLocationSelect={() => {}} />
        {salon.videoUrl && (
          <div className="view-video">
            <h3>Video</h3>
            <br />
            <video style={{ width: "100%", borderRadius: "8px" }} src={salon.videoUrl} controls />
          </div>
        )}
        {salon.imageUrl && (
          <div className="view-image">
            <h3>Image</h3>
            <br />
            <img style={{ width: "100%", borderRadius: "8px" }} src={salon.imageUrl} alt={salon.name} />
          </div>
        )}
        <div className="div-a">
          <button type="button" onClick={close} className="btn-p">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
