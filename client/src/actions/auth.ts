import { FormDataType } from "../interfaces/FormDataType";
import * as api from '../api/index';

export const signup = (formData: FormDataType, history: any) => async (dispatch: any) => {
    try {
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const signin = (formData: FormDataType, history: any) => async (dispatch: any) => {
    try {
        history.push('/');
    } catch (error) {
        console.log(error);
    }
}