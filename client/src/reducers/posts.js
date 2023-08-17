export const reducer = (state = [], action) => {
    // in this reducer, state is always posts
    switch (action.type) {
        case "FETCH_ALL":
            return state;
        case "CREATE":
            return state;
        default:
            return state;
    }
}