const DEFAULT_STATE = {
  customer: [],
};

export const customerReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "GET_CUSTOMER") {
    return { ...state, customer: action.payload };
  } else if (action.type === "PUT_CUSTOMER") {
    return {
      ...state,
      customer: state.customer.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ),
    };
  } else if (action.type === "POST_CUSTOMER") {
    return { ...state, customer: [...state.customer, action.payload] };
  } else if (action.type === "DEL_CUSTOMER") {
    return {
      ...state,
      customer: state.customer.filter((item) => item.id !== action.payload),
    };
  } else {
    return state;
  }
};
