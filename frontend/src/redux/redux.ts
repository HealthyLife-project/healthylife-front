import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 타입 정의
interface TokenState {
  tokenList: Record<string, string>; // key-value 형태의 객체
  tokenSet: Record<string, string>;
}

// 초기 상태
const initialState: TokenState = {
  tokenList: {},
  tokenSet: {},
};

const tokenSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenList: (state, action) => {
      state.tokenList = action.payload;
    },
    setTokenDataset: (state, action) => {
      state.tokenSet = action.payload;
    },
  },
});

export const { setTokenList, setTokenDataset } = tokenSlices.actions;
export default tokenSlices.reducer;
