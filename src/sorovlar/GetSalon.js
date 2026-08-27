export const GetSalon = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "https://backend.magnateshop.uz/api/pickup-points",
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
    throw new Error(resData?.message || "Qo'shishda xatolik");
  }

  return resData;
};

export const EditSalon = async ({ id, data }) => {
  const token = localStorage.getItem("access_token");

  const res = await fetch(
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

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData?.message || "Tahrirlashda xatolik");
  }

  return resData;
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
