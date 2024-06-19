import { manageService } from "./manageService";
import {
  registerStart,
  registerSuccess,
  registerFailed,
  loginStart,
  loginSuccess,
  loginFailed,
  logOutStart,
  logOutSuccess,
  logOutFailed,
  updateSuccess,
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
        dispatch({ type: "auth/logOutSuccess", userData });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const updateAction = (formData, token) => {
  return async (dispatch) => {
    try {
      const res = await manageService.updateProfile(formData, token);
      console.log(res);
      if (res.status === 200) {
        dispatch(updateSuccess({ formData: res.data.data.user }));
      }
      location.reload();
    } catch (error) {
      console.log("check: ", error);
    }
  };
};

export { registerAction, loginAction, logoutAction, updateAction };
