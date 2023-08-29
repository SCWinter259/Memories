import { UserType } from "../types/UserType";

export const getUser = (): UserType | undefined | null => {
    return JSON.parse(String(localStorage.getItem("profile")));
}