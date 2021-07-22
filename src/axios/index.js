import axios from "axios";
import store from "../redux/store";
import { setLoading, unSetLoading } from "../redux/actions/loader";
import { setErrorAlert, setSuccessAlert } from "../redux/actions/alert";
import { getUser } from "../utils/localStorage";

const axiosHook = (URL = "", methods = "GET", body = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    const dispatch = store.dispatch;
    dispatch(setLoading());
    let token = getUser() ? getUser().token : "";
    console.log(token);
    let baseurl = process.env.REACT_APP_BACKEND_URL;
    let param = {
      url: baseurl + URL,
      method: methods,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        ...header,
      },
    };
    try {
      const { data, status, headers } = await axios(param);
      setTimeout(() => {
        dispatch(unSetLoading());
      }, 300);

      if (status === 200) {
        console.log({ data, status, headers });
        if (data["message"]) dispatch(setSuccessAlert(data.message));
        return resolve({ response: data, headers, error: null });
      }
    } catch (error) {
      console.log(error);
      let err = "";
      if (error && error.response) {
        const { data, status } = error.response;
        if (status === 500) err = "500 Server error";
        else if (data && data.error) err = data.error;
        else if (data && data.message) err = data.message;
      } else if (error) {
        if (error.message) err = error.message;
      }
      dispatch(setErrorAlert(err));
      setTimeout(() => {
        dispatch(unSetLoading());
      }, 300);
      console.log(err);
      return resolve({
        response: null,
        headers: null,
        error: err,
      });
    }
  });
};

export default axiosHook;
