export const GetAdmin = async () => {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`https://backend.magnateshop.uz/api/admins`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw { response: { data } };
  return data;
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
  const data = await res.json();
  if (!res.ok) throw { response: { data } };
  return data;
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
  const resData = await res.json();
  if (!res.ok) throw { response: { data: resData } }; 
  return resData;
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
  const resData = await res.json();
  
  if (!res.ok) {
    throw { response: { data: resData } };
  }
  
  return resData;
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
    }
  );
  const data = await res.json();
  if (!res.ok) throw { response: { data } };
  return data;
};