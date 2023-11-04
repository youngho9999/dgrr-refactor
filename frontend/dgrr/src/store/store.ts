import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameSlice from "./gameSlice";

const reducer = combineReducers({
  game:gameSlice,
})

export const store = configureStore({
  reducer,
})

export default store;