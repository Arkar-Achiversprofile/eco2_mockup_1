"use client";
import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../api/localStorage";
import { LoginRegisterController } from "../controller/login_register_controller/LoginRegister";
import { useMediaQuery } from "react-responsive";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    userId: 0,
    qrUrl: "",
    greenCurrencyBalance: 0,
    userName: "",
    role: null,
  });

  const [contextBreadCrumb, setContextBreadCrumb] = useState([]);
  const [GCBalance, setGCBalance] = useState(0);
  // console.log("context user info =====>", userInfo);
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 1050px)",
  });

  useEffect(() => {
    autoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoLogin = () => {
    let userName = getLocalStorage("userName");
    let password = getLocalStorage("password");
    if (userName != "" && password != "") {
      LoginRegisterController.loginAccount(
        { userName: userName, password: password },
        (data) => {
          if (data.userName) {
            const oldUser = { ...userInfo };
            oldUser.userId = data.id;
            oldUser.qrUrl = data.qrURL;
            oldUser.greenCurrencyBalance = data.greenCurrencyBalance;
            oldUser.userName = data.userName;
            oldUser.role = data.role;
            setUserInfo(oldUser);
          }
        }
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        contextBreadCrumb,
        setContextBreadCrumb,
        isMobile,
        isTablet,
        GCBalance,
        setGCBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
