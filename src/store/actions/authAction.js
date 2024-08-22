import { axiosInstance } from "../../lib/axios";

export const authLogin = (credentials) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });

  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    const userData = response.data.data;

    localStorage.setItem("token", userData.token);

    dispatch({
      type: "AUTH_SUCCESS",
      payload: userData.user,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_FAILURE",
      payload: error.response?.data?.message || "Login Failed",
    });
  }
};

export const authRegister = (userDetails) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });

  try {
    const response = await axiosInstance.post("/auth/register", userDetails);
    const userData = response.data;

    localStorage.setItem("token", userData.token);

    dispatch({
      type: "AUTH_SUCCESS",
      payload: userData.user,
    });
  } catch (error) {
    dispatch({
      type: "AUTH_FAILURE",
      payload: error.response?.data?.message || "Register Failed",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("data");

  dispatch({
    type: "LOGOUT",
  });
};
