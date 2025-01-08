"use client";

import { RootState, store } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setLoginSession, setStateLogin } from "./auth";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Kiểm tra nếu đang ở môi trường client-side
    if (typeof window !== "undefined") {
      // lấy dữ liệu từ localStorage
      const loginInfoString = localStorage.getItem("loginInfo");
      const loginInfo = loginInfoString ? JSON.parse(loginInfoString) : {};
      if (loginInfo?.access_token) {
        store.dispatch(setStateLogin(true));
      }
      store.dispatch(
        setLoginSession({
          access_token: loginInfo?.access_token,
          refresh_token: loginInfo?.refresh_token,
          session_state: loginInfo?.session_state,
        }),
      );
    }
  }, [initialized]);

  return <>{children}</>;
}
