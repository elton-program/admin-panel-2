"use client";
import React, { useEffect, useState } from "react";
import "@/app/products/modals/modal.css";
import { useSalon } from "@/hooks/useSalon";
import dynamic from "next/dynamic";
const SalonMap = dynamic(() => import("./SalonMap"), {
  ssr: false,
});
const EditModal = ({ edit, close }) => {
  const { editSalon } = useSalon();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    opensAt: "",
    closesAt: "",
    latitude: 0,
    longitude: 0,
  });
  const [position, setPosition] = useState(null);
  useEffect(() => {
    if (edit) {
      const latitude = Number(edit.latitude) || 0;
      const longitude = Number(edit.longitude) || 0;

      setFormData({
        name: edit.name || "",
        city: edit.city || "",
        address: edit.address || "",
        phone: edit.phone || "",
        opensAt: edit.opensAt || "",
        closesAt: edit.closesAt || "",
        latitude,
        longitude,
      });

      setPosition({
        lat: latitude,
        lng: longitude,
      });
    }
  }, [edit]);

  if (!edit) return null;

  const handleSelect = async (lat, lng) => {
    const latitude = Number(Number(lat).toFixed(6));
    const longitude = Number(Number(lng).toFixed(6));

    setPosition({
      lat: latitude,
      lng: longitude,
    });

    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=uz`,
      );

      if (!response.ok) {
        throw new Error("Xato boldi");
      }

      const data = await response.json();

      const address = data.display_name || "";

      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.municipality ||
        data.address?.state ||
        "";
      setFormData((prev) => ({
        ...prev,
        latitude,
        longitude,
        address,
        city,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editSalon(
      {
        id: edit.id,
        data: formData,
      },
      {
        onSuccess: () => {
          close();
        },
        onError: (err) => {
          console.error(err);
        },
      },
    );
  };
  return (
    <div className="add">
      <div className="modal-a sal">
        <form className="form-a" onSubmit={handleSubmit}>
          <input
            className="inp-a"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                city: e.target.value,
              }))
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            required
          />
          <input
            className="inp-a"
            type="time"
            value={formData.opensAt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                opensAt: e.target.value,
              }))
            }
          />
          <input
            className="inp-a"
            type="time"
            value={formData.closesAt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                closesAt: e.target.value,
              }))
            }
          />
          <input
            className="inp-a"
            type="number"
            placeholder="Latitude"
            value={formData.latitude || ""}
            readOnly
          />
          <input
            className="inp-a"
            type="number"
            placeholder="Longitude"
            value={formData.longitude || ""}
            readOnly
          />
          <SalonMap position={position} onLocationSelect={handleSelect} />
          <div className="div-a">
            <button type="submit" className="btn-p">
              Edit
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
