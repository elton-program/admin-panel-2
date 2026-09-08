export const GetSalon = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "https://backend.magnateshop.uz/api/pickup-points?limit=90",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Salonlarni olishda xatolik");
  }

  return data;
};

export const DeleteSalon = async (id) => {
  const token = localStorage.getItem("access_token");

  const res = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "O'chirishda xatolik");
  }

  return data;
};

export const AddSalon = async (data) => {
  const token = localStorage.getItem("access_token");

  const res = await fetch("https://backend.magnateshop.uz/api/pickup-points", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData?.message || "Qoshishda xatolik");
  }

  return resData;
};
export const ViewSalon = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Salon ma'lumotlarini olishda xato");
  }

  return data;
};
export const EditSalon = async ({ id, data }) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Salon tahrirlashda xato");
  }

  return result;
};

export const ToggleCat = async ({ id, isActive }) => {
  const token = localStorage.getItem("access_token");

  const res = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}/status`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    },
  );

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData?.message || "Statusni o'zgartirishda xatolik");
  }

  return resData;
};
export const AddImage = async ({ id, file }) => {
   const token = localStorage.getItem("access_token");

  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}/image`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Rasm yuklashda xatolik");
  }

  return data;
};

export const AddVideo = async ({ id, file }) => {
  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("video", file);
  const response = await fetch(
    `https://backend.magnateshop.uz/api/pickup-points/${id}/video`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Video yuklashda xatolik");
  }
  return data;
};
