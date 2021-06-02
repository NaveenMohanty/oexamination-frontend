import React from "react";
import axios from "axios";
const axiosHook = async ({
  URL = "",
  methods = "GET",
  body = {},
  header = {},
}) => {
  let param = {
    url: `${process.env.REACT_APP_BACKEND_URL}${URL}`,
    method: methods,
    data: body,
    timeout: 5000,
    auth: {
      Authorization: `Bearer `,
      ...header,
    },
  };
  try {
    const { data, status, headers } = await axios(param);
    if (status === 200) {
      return { response: data, headers, error: null };
    } else {
      return { response: data, headers, error: status };
    }
  } catch (error) {
    return { response: null, headers: null, error };
  }
};

export default axiosHook;
