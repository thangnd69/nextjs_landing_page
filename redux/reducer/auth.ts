import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ILoginSession {
  access_token: string | null;
  refresh_token: string | null;
  session_state: string | null;
}

interface IAuth {
  loginSession: ILoginSession | null;
  initialized: boolean; // Thêm trường này
  isLogin: boolean;
}

const initialState: IAuth = {
  loginSession: null,
  initialized: false, // Mặc định là false
  isLogin: false,
};

export const authuSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginSession: (state, action: PayloadAction<ILoginSession>) => {
      state.loginSession = action.payload;
    },
    setStateLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action?.payload;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

// Xuất action và reducer
export const { setLoginSession, setInitialized, setStateLogin } = authuSlice.actions;
export default authuSlice.reducer;
