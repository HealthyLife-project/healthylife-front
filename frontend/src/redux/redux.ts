import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// 유저 타입 정의
interface UserType {
  [x: string]: any;
  name: string;
  userid: string;
  id: string;
}

// 타입 정의
interface TokenState {
  tokenList: {
    [x: string]: any;
    token: UserType;
  } | null;
  tokenSet: Record<string, string>; // key-value 형태의 객체
  isAuthenticated: boolean; // 추가: 인증 상태
}

// 초기 상태
const initialState: TokenState = {
  // 초기값을 설정
  tokenList: {
    token: {
      name: "",
      userid: "",
      id: "",
    },
  },
  tokenSet: {},
  isAuthenticated: false, // 추가: 초기 인증 상태는 false
};

const tokenSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTokenList: (state, action: PayloadAction<TokenState["tokenList"]>) => {
      state.tokenList = action.payload;
      // 사용자가 로그인하면 isAuthenticated를 true로 설정
      state.isAuthenticated = !!action.payload?.id;
    },
    setTokenDataset: (state, action: PayloadAction<Record<string, string>>) => {
      state.tokenSet = action.payload;
    },
    // 추가: 인증 상태를 직접 설정하는 reducer (예: 로그아웃 시)
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setTokenList, setTokenDataset } = tokenSlices.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.token.isAuthenticated;

export default tokenSlices.reducer;
