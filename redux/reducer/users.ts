import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string | null;
}

const initialState: IUser = {
  email: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = action?.payload;
    },
  },
});

// Xuất action và reducer
export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
