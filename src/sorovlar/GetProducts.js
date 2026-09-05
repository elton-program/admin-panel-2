export const GetProducts = async ({ page = 1, limit = 10, search = "" } = {}) => {
  const token = localStorage.getItem("access_token");
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search.trim()) {
    params.append("search", search.trim());
  }
  const response = await fetch(
    `https://backend.magnateshop.uz/api/products?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data?.message);
  }
  return response.json();
};
export const DeleteProducts = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
export const AddProducts = async (data) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const EditProducts = async ({ id, data }) => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(`https://backend.magnateshop.uz/api/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};