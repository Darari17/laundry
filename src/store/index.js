import { combineReducers } from "redux";
import { productReducer } from "./reducers/productReducer";
import { customerReducer } from "./reducers/customerReducer";
import { billReducer } from "./reducers/billReducer";
import { authReducer } from "./reducers/authReducer";

export const reducers = combineReducers({
  product: productReducer,
  customer: customerReducer,
  bill: billReducer,
  auth: authReducer,
});
