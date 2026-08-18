export const GetProducts = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "https://backend.magnateshop.uz/api/products?page=1&limit=20",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Products olishda xatolik yuz berdi");
  }

  return response.json();
};