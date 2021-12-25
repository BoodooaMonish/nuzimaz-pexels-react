//inital state
const initialState = {
    loading: false,
    error: false,
    data: {},
};

//action names
export const FETCHSEARCH = "FETCHSEARCH";
const WAITSEARCH = "WAITSEARCH";
const ERRORSEARCH = "ERRORSEARCH";
const ADDSEARCH = "ADDSEARCH";
export const FETCHNEXTSEARCH = "FETCHNEXTSEARCH";
export const FETCHPREVSEARCH = "FETCHPREVSEARCH";

//dispatch functions
export const fetchSearch = (query) => ({
    type: FETCHSEARCH,
    payload: query,
});
export const waitSearch = () => ({
    type: WAITSEARCH,
});
export const errorSearch = () => ({
    type: ERRORSEARCH,
});
export const addSearch = (data) => ({
    type: ADDSEARCH,
    payload: data,
});
export const fetchNextSearch = (url) => ({
    type: FETCHNEXTSEARCH,
    payload: url,
});
export const fetchPrevSearch = (url) => ({
    type: FETCHPREVSEARCH,
    payload: url,
});

//reducer
function searchReducer(state = initialState, action) {
    switch (action.type) {
        case WAITSEARCH:
            return { ...state, loading: true, error: false, data: {} };
        case ERRORSEARCH:
            return { ...state, loading: false, error: true, data: {} };
        case ADDSEARCH:
            return { ...state, loading: false, error: false, data: action.payload };
        default:
            return state;
    }
}

export default searchReducer;
