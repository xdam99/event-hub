import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useDipatch from "react-redux";
import type { Dependencies } from "./dependencies";

const reducers = combineReducers({});

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;

export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];



export const createStore = (config: {
    depedencies: Dependencies
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.depedencies
                }
            })
        }
    })
    return store
}

export const useAppDispatch = () => useDipatch<AppDispatch>();