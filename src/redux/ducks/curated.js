//inital state
const initialState = {
    loading: false,
    error: false,
    data: {},
};

//action names
export const FETCHCURATED = "FETCHCURATED";
const WAITCURATED = "WAITCURATED";
const ERRORCURATED = "ERRORCURATED";
const ADDCURATED = "ADDCURATED";
export const FETCHNEXTCURATED = "FETCHNEXTCURATED";
export const FETCHPREVCURATED = "FETCHPREVCURATED";

//dispatch functions
export const fetchCurated = () => ({
    type: FETCHCURATED,
});
export const waitCurated = () => ({
    type: WAITCURATED,
});
export const errorCurated = () => ({
    type: ERRORCURATED,
});
export const addCurated = (data) => ({
    type: ADDCURATED,
    payload: data,
});
export const fetchNextCurated = (url) => ({
    type: FETCHNEXTCURATED,
    payload: url,
});
export const fetchPrevCurated = (url) => ({
    type: FETCHPREVCURATED,
    payload: url,
});

//reducer
function curatedReducer(state = initialState, action) {
    switch (action.type) {
        case WAITCURATED:
            return { ...state, loading: true, error: false, data: {} };
        case ERRORCURATED:
            return { ...state, loading: false, error: true, data: {} };
        case ADDCURATED:
            return { ...state, loading: false, error: false, data: action.payload };
        default:
            return state;
    }
}

export default curatedReducer;
