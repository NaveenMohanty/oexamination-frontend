export const addUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
export const getUser = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return user;
  } else {
    return false;
  }
};
export const removeUser = () => {
  localStorage.removeItem("user");
};
