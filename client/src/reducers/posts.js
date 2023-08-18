export const reducer = (state = [], action) => {
    // in this reducer, state is always posts
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...state, action.payload];
        default:
            return state;
    }
}