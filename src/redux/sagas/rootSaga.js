import { takeLatest } from "redux-saga/effects";
import { FETCHCURATED, FETCHNEXTCURATED, FETCHPREVCURATED } from "../ducks/curated";
import { FETCHNEXTSEARCH, FETCHPREVSEARCH, FETCHSEARCH } from "../ducks/search";
import { handleGetCurated, handleGetNextCurated, handleGetPrevCurated } from "./handler/curated";
import { handleGetNextSearch, handleGetPrevSearch, handleGetSearch } from "./handler/search";

export function* watcherSaga() {
    yield takeLatest(FETCHCURATED, handleGetCurated);
    yield takeLatest(FETCHNEXTCURATED, handleGetNextCurated);
    yield takeLatest(FETCHPREVCURATED, handleGetPrevCurated);
    yield takeLatest(FETCHSEARCH, handleGetSearch);
    yield takeLatest(FETCHNEXTSEARCH, handleGetNextSearch);
    yield takeLatest(FETCHPREVSEARCH, handleGetPrevSearch);
}
