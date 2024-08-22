const DEFAULT_STATE = {
  product: [],
};

export const productReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "GET_PRODUCT") {
    return { ...state, product: action.payload };
  } else if (action.type === "PUT_PRODUCT") {
    return {
      ...state,
      product: state.product.map((item) =>
        item.id === action.payload.id ? action.payload : item
      ),
    };
  } else if (action.type === "POST_PRODUCT") {
    return { ...state, product: [...state.product, action.payload] };
  } else if (action.type === "DEL_PRODUCT") {
    return {
      ...state,
      product: state.product.filter((item) => item.id !== action.payload),
    };
  } else {
    return state;
  }
};
