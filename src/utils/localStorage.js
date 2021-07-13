export const addUser = async (data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem("user", JSON.stringify(data));
    setTimeout(() => {
      return resolve();
    }, 100);
  });
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
