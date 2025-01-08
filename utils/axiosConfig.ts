import { setLoginSession } from "@/redux/reducer/auth";
import { RootState, store } from "@/redux/store";
import axios from "axios";
import { useSelector } from "react-redux";

export const publicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Thay đổi với URL API của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho mỗi request để tự động thêm access_token vào header
axiosInstance.interceptors.request.use(
  (config) => {
    const { loginSession } = useSelector((state: RootState) => state.auth);
    const access_token = loginSession?.access_token;
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Thêm interceptor để xử lý khi nhận được response lỗi 401 (hết hạn access_token)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { loginSession } = useSelector((state: RootState) => state.auth);
    if (error.response.status === 401 && !originalRequest._retry) {
      // Nếu token hết hạn, thử refresh lại token
      originalRequest._retry = true;
      // Gọi API refresh token
      try {
        const response = await axios.post("/auth/refresh", {
          refresh_token: loginSession?.refresh_token,
        });
        const { access_token, refresh_token, session_state } = response.data;
        store.dispatch(
          setLoginSession({
            access_token: access_token || "",
            refresh_token: refresh_token || "",
            session_state: session_state || "",
          }),
        );
        // Lưu lại access_token và refresh_token mới
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        // Thực hiện lại request ban đầu với access_token mới
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng không hợp lệ, yêu cầu đăng nhập lại
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
