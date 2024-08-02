"use client";
import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useRouter } from "next/navigation";
import { LoginRegisterController } from "../controller/login_register_controller/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../context/AppContext";
import {getLocalStorage, setLocalStorage} from "../api/localStorage";

export default function Login() {
  const [isShow, setIsShow] = useState(false);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(AppContext);

  const onChangeText = (text, value) => {
    const data = { ...loginData };
    data[text] = value;
    setLoginData(data);
  };

  const onClickLogin = () => {
    LoginRegisterController.loginAccount(
      { userName: loginData.userName, password: loginData.password },
      (data) => {
        // console.log("login user info =====>", data)
        if (data.userName != '') {
          setLocalStorage("id", data.id);
          setLocalStorage("password", loginData.password);
          setLocalStorage("userName", loginData.userName);
          const oldUser = { ...userInfo };
          oldUser.userId = data.id;
          oldUser.qrUrl = data.qrURL;
          oldUser.greenCurrencyBalance = data.greenCurrencyBalance;
          oldUser.userName = data.userName;
          oldUser.role = data.role;
          setUserInfo(oldUser);
          router.push("/");
        } else {
          toast.error("User Name or Password is wrong!");
        }
      }
    );
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div className="d-flex justify-content-center">
        <div className="pt-5 pb-5" style={{ width: "80%" }}>
          <h1>Login</h1>
          <p style={{ color: "#717171" }}>Please fill in this form to login.</p>
          <hr />
          {/* <div className="row align-items-center bg-light">
          <p className="col-12 col-md-2 fw-bold">Username:</p>
          <div className="col-12 col-md-10 form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Your username"
              style={{ color: "#717171" }}
            />
            <label
              for="floatingInput"
              style={{ color: "#717171", marginLeft: 10 }}
            >
              Your username
            </label>
          </div>
        </div> */}

          {/* <p className="fw-bold">Username :</p>
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="floatinginput"
            placeholder="Your username"
            style={{ color: "#717171" }}
          />
          <label for="floatinginput" style={{ color: "#717171" }}>
            Your username
          </label>
        </div> */}

          {/* <p className="fw-bold mt-3">Password :</p>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Your password"
            style={{ color: "#717171" }}
          />
          <label for="floatingPassword" style={{ color: "#717171" }}>
            Your password
          </label>
        </div> */}
          <p className="fw-bold mt-5">Username :</p>
          <div class="input-group mb-3" style={{ width: "100%" }}>
            <input
              class="form-control"
              id="username"
              name="username"
              placeholder="Your username"
              type="text"
              value={loginData.userName}
              onChange={(v) => onChangeText("userName", v.target.value)}
              style={{ fontSize: 16, height: 50 }}
            />
          </div>
          <p className="fw-bold mt-3">Password :</p>
          <div class="input-group mb-3" style={{ width: "100%" }}>
            <input
              class="form-control"
              id="password"
              name="password"
              placeholder="Your password"
              type={isShow ? "text" : "password"}
              value={loginData.password}
              onChange={(v) => onChangeText("password", v.target.value)}
              style={{ fontSize: 16, height: 50 }}
            />
            <span class="input-group-text" onClick={() => setIsShow(!isShow)}>
              <i
                class={isShow ? "bi bi-eye-slash" : "bi bi-eye"}
                id="togglePassword"
                style={{ cursor: "pointer" }}
              ></i>
            </span>
          </div>
          <p className="text-end mt-5">
            Forgot{" "}
            <span
              onClick={() =>
                router.push(
                  "/login/forgot_username_password" +
                    "?" +
                    createQueryString("type", "forgot_username")
                )
              }
              style={{
                color: "#04BADE",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Username
            </span>{" "}
            or{" "}
            <span
              onClick={() =>
                router.push(
                  "/login/forgot_username_password" +
                    "?" +
                    createQueryString("type", "forgot_password")
                )
              }
              style={{
                color: "#04BADE",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Password
            </span>
            ?
          </p>
          <hr />
          <button
            type="button"
            class="btn btn-success btn-lg"
            style={{ width: "100%", marginTop: 30, backgroundColor: "green" }}
            onClick={() => onClickLogin()}
          >
            Login
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary btn-lg"
            style={{
              width: "100%",
              marginTop: 20,
              backgroundColor: "#F1F1F1",
              borderColor: "#F1F1F1",
            }}
            onClick={() => router.push("/login/signup")}
          >
            <span style={{ fontSize: 14, color: "#04BADE" }}>
              No Account? Register here
            </span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
