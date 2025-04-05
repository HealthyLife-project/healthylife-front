import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 유저 타입 정의
interface UserType {
  name: string;
  // 필요 시 여기에 userid, email 등 추가 가능
}

// 타입 정의
interface TokenState {
  tokenList: {
    token: UserType;
  };
  tokenSet: Record<string, string>; // key-value 형태의 객체
}

// 초기 상태
const initialState: TokenState = {
  tokenList: {
    token: {
      name: "", // 초기값을 설정
    },
  },
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
