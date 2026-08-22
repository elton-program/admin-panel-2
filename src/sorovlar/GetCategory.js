export const GetCategory = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(
    `https://backend.magnateshop.uz/api/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.json();
};
export const DeleteCategory = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(
    `https://backend.magnateshop.uz/api/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    throw new Error(data?.message || "O'chirishda xatolik yuz berdi");
  }
  return res.json();
};
export const AddCategory = async (data) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const EditCategory = async ({ id, data }) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(
    `https://backend.magnateshop.uz/api/categories/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  return res.json();
};
export const ToggleCat = async ({ id, isActive }) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(
    `https://backend.magnateshop.uz/api/categories/${id}/status`,
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
    throw new Error(resData?.message);
  }
  return resData;
};
