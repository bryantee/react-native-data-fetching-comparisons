import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {charactersSlice} from "../features/characters/charactersSlice";

const reducers = combineReducers({
  characters: charactersSlice.reducer,
})

export const store = configureStore({reducer: reducers})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
