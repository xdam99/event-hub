import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import type { Dependencies } from "./dependencies";

const appReducer = (state = { ready: true}) => state

const reducers = combineReducers({
    app: appReducer
})


export const createStore = (config: {
    dependencies: Dependencies
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies
                }
            })
        }
    })
    return store;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

export const useAppDispatch = () => useDispatch<AppDispatch>();

