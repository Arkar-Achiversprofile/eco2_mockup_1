"use client";
import React, { Suspense, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginRegisterController } from "../../controller/login_register_controller/LoginRegister";
import { color } from "../../components/color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../controller/baseUrl";

export default function ResetPassword() {
  return (
    <div>
      <NavBar />
      <ToastContainer />
      <Suspense>
        <Boundary />
      </Suspense>
    </div>
  );
}

function Boundary() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [resetPasswordCode, setResetPasswordCode] = useState(0);
  const [checkCode, setCheckCode] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get("resetCode");
  const router = useRouter();

  useEffect(() => {
    resetCodeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetCodeCheck = () => {
    LoginRegisterController.verificationResetCode(code, (data) => {
      if (data.id) {
        setCheckCode(true);
        setUserId(data.id);
        setResetPasswordCode(parseInt(data.passwordResetCode));
      } else {
        setCheckCode(false);
      }
    });
  };

  const onSubmitNewPassword = () => {
    if (newPassword != confirmPassword) {
      toast.warn("New Password and Confirm Password must be the same!", {
        position: "top-right",
      });
    } else {
      try {
        fetch(
          `${baseUrl}AccountItems/resetpassword?aId=${userId}&aResetCode=${resetPasswordCode}&aNewPassword=${newPassword}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json;",
            },
          }
        )
          .then(async (response) => {
            if (response.status == 204) {
              toast.success("New Password is successful!", {
                position: "top-right",
              });
              setTimeout(() => {
                router.push("/login");
              }, 5000);
            } else {
              toast.error("Something went wrong!");
            }
          })
          .catch((err) => console.log("email error =====>", err));
      } catch (err) {
        console.error(err);
        toast.error("Something went wrond!");
      }
    }
  };
  return (
    <div>
      {checkCode ? (
        <div className="d-flex justify-content-center">
          <div className="pt-5 pb-5" style={{ width: "80%" }}>
            <h1>Reset Password</h1>
            <p style={{ color: "#717171" }}>Please fill in this form.</p>
            <hr />

            <p className="fw-bold mt-5">New Password :</p>
            <div class="input-group mb-3" style={{ width: "100%" }}>
              <input
                class="form-control"
                id="newpassword"
                name="newpassword"
                placeholder="New password"
                type={isShowPassword ? "text" : "password"}
                value={newPassword}
                onChange={(v) => setNewPassword(v.target.value)}
                style={{ fontSize: 16, height: 50 }}
              />
              <span
                class="input-group-text"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                <i
                  class={isShowPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
            <p className="fw-bold mt-5">Confirm Password :</p>
            <div class="input-group mb-3" style={{ width: "100%" }}>
              <input
                class="form-control"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm password"
                type={isShowConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(v) => setConfirmPassword(v.target.value)}
                style={{ fontSize: 16, height: 50 }}
              />
              <span
                class="input-group-text"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                <i
                  class={
                    isShowConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                  }
                  id="togglePassword"
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>

            <hr />
            <button
              type="button"
              class="btn btn-success btn-lg"
              style={{ width: "100%", marginTop: 30, backgroundColor: "green" }}
              onClick={() => onSubmitNewPassword()}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: color.white }}>404 Page Not Found</h1>
        </div>
      )}
    </div>
  );
}
