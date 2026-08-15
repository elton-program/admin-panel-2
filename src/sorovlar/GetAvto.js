export const GetAvto = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "https://backend.magnateshop.uz/api/dashboard/stats?threshold=5",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "hatolik yuz berdi");
  }

  return response.json();
};