import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  name: string | null;
  email: string | null;
  website: string | null;
  phone: string | null;
}

interface IUsers {
  users: IUser[];
}

const initialState: IUsers = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action?.payload;
    },
  },
});

// Xuất action và reducer
export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
