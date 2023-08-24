import { AUTH, LOGOUT } from "../constants/actionTypes";

export const authReducer = (
  state: any = { authData: null },
  action: { type: string; data: { result: any; token: any } }
) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
