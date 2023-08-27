import { FormDataType } from "../types/FormDataType";
import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signup =
  (formData: FormDataType, history: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signin =
  (formData: FormDataType, history: any) => async (dispatch: any) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
