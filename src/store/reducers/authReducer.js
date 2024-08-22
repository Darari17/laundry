const DEFAULT_STATE = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "AUTH_REQUEST") {
    return { ...state, loading: true, error: null };
  } else if (action.type === "AUTH_SUCCESS") {
    return {
      ...state,
      loading: false,
      user: action.payload,
    };
  } else if (action.type === "AUTH_FAILURE") {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  } else if (action.type === "LOGOUT") {
    return {
      ...state,
      user: null,
    };
  } else {
    return state;
  }
};
