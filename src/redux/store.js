import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import curatedReducer from "./ducks/curated";
import searchReducer from "./ducks/search";

const reducers = combineReducers({
    curated: curatedReducer,
    search: searchReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(reducers, {}, applyMiddleware(...middlewares));

sagaMiddleware.run(watcherSaga);

export default store;
