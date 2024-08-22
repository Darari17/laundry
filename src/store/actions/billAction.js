import { axiosInstance } from "../../lib/axios";

export const getBill = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/bills");
    dispatch({
      type: "GET_BILL",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};

export const postBill = (newBill) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/bills", newBill);
    dispatch({
      type: "POST_BILL",
      payload: response.data.data,
    });
    dispatch(getBill());
  } catch (error) {
    console.log("ERROR POSTING DATA", error);
  }
};

export const getDetailBill = (id) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/bills/${id}`);
    dispatch({
      type: "GET_DETAIL_BILL",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};
