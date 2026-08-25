export const GetAdmin = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`https://backend.magnateshop.uz/api/admins`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
export const DeleteAdmin = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/admins/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(data?.message || "O'chirishda xatolik yuz berdi");
  }
  return res.json();
};
export const AddAdmin = async (data) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/admins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const EditAdmin = async ({ id, data }) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/admins/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const ChangeAdmin = async ({ currentPassword, newPassword }) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(
    `https://backend.magnateshop.uz/api/admins/me/password`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    },
  );
  return res.json();
};
