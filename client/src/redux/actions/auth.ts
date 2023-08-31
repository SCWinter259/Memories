import { FormDataType } from "../../types/FormDataType";
import { AUTH } from "../../constants/actionTypes";
import * as api from "../../api/index";
import { History } from "history";
import { Dispatch } from "redux";

export const signup =
  (formData: FormDataType, history: History) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

export const signin =
  (formData: FormDataType, history: History) => async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
