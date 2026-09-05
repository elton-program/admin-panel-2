"use client";
import React, { useState } from "react";
import "@/app/products/modals/modal.css";
import { useSalon } from "@/hooks/useSalon";
import dynamic from "next/dynamic";
const SalonMap = dynamic(() => import("./SalonMap"), {
  ssr: false,
});
const AddModal = ({ Add, close }) => {
  const { addSalon } = useSalon();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
    opensAt: "",
    closesAt: "",
    latitude: Number(0),
    longitude: Number(0),
  });
  const [position, setPosition] = useState(null);
  if (!Add) return null;

  const handleSelect = async (lat, lng) => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    setPosition({
      lat: latitude,
      lng: longitude,
    });

    setFormData((prev) => ({
      ...prev,
      latitude: latitude,
      longitude: longitude,
    }));
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=uz`,
      );
      if (!response.ok) {
        throw new Error("Xato boldi nimadir");
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
        latitude: latitude,
        longitude: longitude,
        address: address,
        city: city,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(typeof formData.latitude);
    console.log(typeof formData.longitude);
    addSalon(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          city: "",
          address: "",
          phone: "",
          opensAt: "",
          closesAt: "",
          latitude: Number(0),
          longitude: Number(0),
        });
        setPosition(null);
        close();
      },
    });
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
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
            required
          />
          <input
            className="inp-a"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            required
          />
          <input
            className="inp-a"
            type="time"
            value={formData.opensAt}
            onChange={(e) =>
              setFormData({
                ...formData,
                opensAt: e.target.value,
              })
            }
          />
          <input
            className="inp-a"
            type="time"
            value={formData.closesAt}
            onChange={(e) =>
              setFormData({
                ...formData,
                closesAt: e.target.value,
              })
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
