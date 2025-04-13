import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./redux";
import themeReducer from "./theme";
//redux store ts
const store = configureStore({
  reducer: {
    token: tokenReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
