"use client";
import React, { useState } from "react";
import "@/app/products/modals/modal.css";
import { useSalon } from "@/hooks/useSalon";
import dynamic from "next/dynamic";
const SalonMap = dynamic(() => import("./SalonMap"), {
  ssr: false,
});
const AddModal = ({ Add, close }) => {
  const { addSalonAsync, SalonImage, SalonVideo } = useSalon();
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
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
        latitude,
        longitude,
        address,
        city,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await addSalonAsync(formData);
      const id = result?.data?.id;
      if (!id) {
        throw new Error("Salon ID qaytmadi");
      }
      if (image) {
        await SalonImage({
          id,
          file: image,
        });
        console.log("Rasm yuklandi");
      }
      if (video) {
        await SalonVideo({
          id,
          file: video,
        });
        console.log("Video yuklandi");
      }
      setFormData({
        name: "",
        city: "",
        address: "",
        phone: "",
        opensAt: "",
        closesAt: "",
        latitude: 0,
        longitude: 0,
      });

      setImage(null);
      setVideo(null);
      setPosition(null);

      close();
    } catch (error) {
      console.error("Salon qo'shishda xatolik:", error);
    }
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
          {/* <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}

          <label className="file-label">
            Video
            <input
              type="file"
              style={{ width: "150px", marginLeft: "10px", borderRadius: "5px", backgroundColor: "#121212",color: "white", padding: "5px" }}
              accept="video/mp4,video/mov,video/webm"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </label>
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
