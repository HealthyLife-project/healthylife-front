import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./redux";

//redux store ts
const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
