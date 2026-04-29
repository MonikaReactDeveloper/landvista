export const setAuth = (data) => {
  localStorage.setItem("auth", JSON.stringify(data));
};

export const getAuth = () => {
  return JSON.parse(localStorage.getItem("auth"));
};

export const logout = () => {
  localStorage.removeItem("auth");
};