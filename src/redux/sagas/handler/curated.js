import axios from "axios";
import { call, put } from "redux-saga/effects";
import { addCurated, errorCurated, waitCurated } from "../../ducks/curated";

export function* handleGetCurated() {
    try {
        yield put(waitCurated());
        const response = yield call(() =>
            axios.request({
                method: "GET",
                url: "https://api.pexels.com/v1/curated?per_page=40",
                headers: {
                    Authorization: process.env.REACT_APP_API_KEY,
                },
            })
        );
        const { data } = response;
        yield put(addCurated(data));
    } catch (error) {
        yield put(errorCurated());
    }
}

export function* handleGetNextCurated(action) {
    try {
        yield put(waitCurated());
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
        yield put(addCurated(data));
    } catch (error) {
        yield put(errorCurated());
    }
}

export function* handleGetPrevCurated(action) {
    try {
        yield put(waitCurated());
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
        yield put(addCurated(data));
    } catch (error) {
        yield put(errorCurated());
    }
}
