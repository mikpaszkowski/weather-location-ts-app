import { createStore, applyMiddleware, Store, Action } from "redux";
import logger from "redux-logger"
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const middlewares = [logger, thunk];

export const store = createStore(rootReducer as any, applyMiddleware(...middlewares))

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default{
    store,
    persistor
}
