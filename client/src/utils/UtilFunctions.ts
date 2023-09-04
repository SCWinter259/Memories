export const getUser = () => {
    return JSON.parse(String(localStorage.getItem("profile")));
}