"use client";
import React, { Suspense, useContext, useState } from "react";
import EnterCode from "./components/EnterCode";
import NavBar from "../../components/NavBar";
import { LoginRegisterController } from "../../controller/login_register_controller/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
import AppContext from "../../context/AppContext";
import { setLocalStorage } from "../../api/localStorage";

export default function Verification() {
  return (
    <div className="">
      <ToastContainer />
      <NavBar />
      <Suspense>
        <Boundary />
      </Suspense>
    </div>
  );
}

function Boundary() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(AppContext);

  const handleCodeSubmit = async (code) => {
    if (isLoading) return;

    try {
      LoginRegisterController.verificationCode(
        {
          id: parseInt(userId),
          verificationCode: code,
        },
        (verifyData) => {
          if (verifyData.userName) {
            setLocalStorage("userName", verifyData.userName);
            setLocalStorage("id", verifyData.id)
            setLocalStorage("email", verifyData.email);
            setLocalStorage("qrUrl", verifyData.qrURL);
            setLocalStorage(
              "greenCurrencyBalance",
              verifyData.greenCurrencyBalance
            );
            setLocalStorage("role", verifyData.role);
            const oldUser = { ...userInfo };
            oldUser.userId = verifyData.id;
            oldUser.qrUrl = verifyData.qrURL;
            oldUser.greenCurrencyBalance = verifyData.greenCurrencyBalance;
            oldUser.userName = verifyData.userName;
            oldUser.role = verifyData.role;
            setUserInfo(oldUser);
            toast.success("Account Creation Successful!", {
              position: "top-right",
            });
            router.push("/");
          } else {
            toast.error("404 Not Found!");
          }
        }
      );
      //   }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="mb-5">Enter 4 Digits Code</h2>
      <EnterCode isLoading={isLoading} callback={handleCodeSubmit} />
    </div>
  );
}
