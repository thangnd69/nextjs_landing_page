import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import usersReducer from "./reducer/users";

// Kết hợp tất cả các reducer lại thành một object duy nhất.
const reducers = combineReducers({
  users: usersReducer,
});

// Cấu hình store
export const store = configureStore({
  reducer: reducers, // Sử dụng reducer kết hợp để quản lý trạng thái toàn cục.
  //   devTools: process.env.NODE_ENV !== "production", // Cho phép sử dụng công cụ Redux DevTools trong môi trường phát triển
  middleware: [thunk], // Thêm redux-thunk vào danh sách middleware để xử lý action bất đồng bộ.
});

// Xác định kiểu dữ liệu cho state và dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
