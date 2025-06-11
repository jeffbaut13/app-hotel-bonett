export const apiUrl = import.meta.env.VITE_API_URL;

export const logOut = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(errorData);
      alert(errorData.mensaje || "Error en logout");
    }
  } catch (error) {
    console.error(error);
    alert("Error en la petición");
  }
};
