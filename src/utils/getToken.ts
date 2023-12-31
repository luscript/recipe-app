export const getToken = () => {
    const token = window.localStorage.getItem("token");
    return token ? {
        Authorization: `Bearer ${token}`,
      } : {};
};