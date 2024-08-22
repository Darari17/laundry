const DEFAULT_STATE = {
  bill: [],
};

export const billReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "GET_BILL") {
    return { ...state, bill: action.payload };
  } else if (action.type === "POST_BILL") {
    return { ...state, bill: [...state.bill, action.payload] };
  } else {
    return state;
  }
};
