export const GetCat = async () => {
  const token = localStorage.getItem("access_token");
  const res = await fetch(
    "https://backend.magnateshop.uz/api/dashboard/category-stats",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  return res.json();
};
