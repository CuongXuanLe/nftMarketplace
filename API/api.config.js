import axiosInstance from "./axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "../Redux/authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "../Redux/userSlice";

const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axiosInstance.post("/users/signup", user);
    console.log('check res regis: ', res)
    dispatch(registerSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axiosInstance.post("/users/login", user);
    dispatch(loginSuccess(res.data));
    console.log("User logged in successfully:", response.data);
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post("/users/forgotPassword", {
      email,
    });

    console.log("Password reset token sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error sending password reset token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.patch(
      `/users/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      }
    );

    console.log("Password reset successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error resetting password:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const updatePassword = async (passwordCurrent, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.patch("/users/updateMyPassword", {
      passwordCurrent,
      password,
      passwordConfirm,
    });

    console.log("Password updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating password:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

export {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logOut,
};
