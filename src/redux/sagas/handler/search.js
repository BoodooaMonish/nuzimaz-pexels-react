import axios from "axios";
import { call, put } from "redux-saga/effects";
import { addSearch, errorSearch, waitSearch } from "../../ducks/search";

export function* handleGetSearch(action) {
    let params = action.payload.query;
    try {
        yield put(waitSearch());
        const response = yield call(() =>
            axios.request({
                method: "GET",
                url: `https://api.pexels.com/v1/search?query=${params}&per_page=40`,
                headers: {
                    Authorization: process.env.REACT_APP_API_KEY,
                },
            })
        );
        const { data } = response;
        yield put(addSearch(data));
    } catch (error) {
        yield put(errorSearch());
    }
}

export function* handleGetNextSearch(action) {
    try {
        yield put(waitSearch());
        const response = yield call(() =>
            axios.request({
                method: "GET",
                url: action.payload,
                headers: {
                    Authorization: process.env.REACT_APP_API_KEY,
                },
            })
        );
        const { data } = response;
        yield put(addSearch(data));
    } catch (error) {
        yield put(errorSearch());
    }
}

export function* handleGetPrevSearch(action) {
    try {
        yield put(waitSearch());
        const response = yield call(() =>
            axios.request({
                method: "GET",
                url: action.payload,
                headers: {
                    Authorization: process.env.REACT_APP_API_KEY,
                },
            })
        );
        const { data } = response;
        yield put(addSearch(data));
    } catch (error) {
        yield put(errorSearch());
    }
}
