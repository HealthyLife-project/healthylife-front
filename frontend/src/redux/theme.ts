import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: any) => state.theme.theme;
export default themeSlice.reducer;
