import { manageService } from "./manageService";
import {
  registerSuccess,
  loginSuccess,
  logOutSuccess,
  logOutFailed,
} from "../Redux/authSlice";

const registerAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await manageService.register(formData);
      if (res.status === 201) {
        dispatch({
          type: "auth/registerSuccess",
          formRegis: res.data.data.user,
        });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({ type: "auth/registerFailed" });
    }
  };
};

const loginAction = (formData) => {
  return async (dispatch) => {
    try {
      const res = await manageService.login(formData);
      if (res.status === 200) {
        dispatch({ type: "auth/loginSuccess", dataUser: res.data });
      }
    } catch (err) {
      console.log("err: ", err);
      dispatch({ type: "auth/loginFailed" });
    }
  };
};

const logoutAction = () => {
  return async (dispatch) => {
    try {
      const res = await manageService.logout();
      const userData = null;
      if (res.status === 200) {
        console.log("hehe");
        dispatch({ type: "auth/logOutSuccess", userData });
        console.log("check");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export { registerAction, loginAction, logoutAction };
