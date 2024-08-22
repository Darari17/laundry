const DEFAULT_STATE = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const authReducer = (state = DEFAULT_STATE, action) => {
    if (action.type === 'AUTH_REQUEST') {
        return { ...state, loading: true, error: null };
    } else if (action.type === 'AUTH_SUCCESS') {
        return {
            ...state,
            loading: false,
            user: action.payload,
            isAuthenticated: true,
        };
    } else if (action.type === 'AUTH_FAILURE') {
        return {
            ...state,
            loading: false,
            error: action.payload,
            isAuthenticated: false,
        };
    } else if (action.type === 'LOGOUT') {
        return {
            ...state,
            user: null,
            isAuthenticated: false,
        };
    } else {
        return state;
    }
};
