"use client";
import React, { Suspense, useState } from "react";
import NavBar from "../../components/NavBar";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginRegisterController } from "../../controller/login_register_controller/LoginRegister";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgot() {
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
  const [forgotUsername, setForgotUsername] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const onSubmitForgotUsername = () => {
    LoginRegisterController.forgotUsername(forgotUsername, (data) => {
      if (data.id) {
        try {
          fetch("https://ecoAPIt.achieversprofile.com/api/Email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;",
            },
            body: JSON.stringify({
              toEmail: `${forgotUsername}`,
              subject: "Eco2Balance Account Username",
              body: `<html><body><p>Good day!</p>
                    <p>Your Account Username is: ${data.userName}</p></body></html>`,
              isHtml: true,
            }),
          })
            .then(async (response) => {
              if (response.ok) {
                return response.text();
              } else {
                toast.error("Something went wrong!");
              }
            })
            .then((res) => {
              toast.success(res, { position: "top-right" });
              setTimeout(() => {
                router.back();
              }, 5000);
            })
            .catch((err) => console.log("email error =====>", err));
        } catch (err) {
          console.error(err);
          toast.error("Something went wrond!");
        }
      } else {
        toast.error("Your email does not matched!", { position: "top-right" });
      }
    });
  };

  const onSubmitForgotPassword = () => {
    LoginRegisterController.forgotPassword(forgotPassword, (data) => {
      if (data.id) {
        try {
          fetch("https://ecoAPIt.achieversprofile.com/api/Email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json;",
            },
            body: JSON.stringify({
              toEmail: `${data.email}`,
              subject: "Eco2Balance Account Password Reset",
              body: `<html><body><p>Good day!</p>
                    <p>You have requested to reset Password to your Eco2Balance account. Please click on the following link, or copy and paste this link
                    into you browser to complete the process:</p><a href="https://feak.achieversprofile.com/login/reset_password?resetCode=${data.passwordResetCode}">https://feak.achieversprofile.com/login/reset_password?resetCode=${data.passwordResetCode}</a>
                    <br/><p>If you do not request this, please ignore this email or contact us at:</p><a href="info@otolithenrichment.com">info@otolithenrichment.com</a></body></html>`,
              isHtml: true,
            }),
          })
            .then(async (response) => {
              if (response.ok) {
                return response.text();
              } else {
                toast.error("Something went wrong!");
              }
            })
            .then((res) => {
              toast.success(res, { position: "top-right" });
            })
            .catch((err) => console.log("email error =====>", err));
        } catch (err) {
          console.error(err);
          toast.error("Something went wrond!");
        }
      } else {
        toast.error("Your name or email does not matched!");
      }
    });
  };
  return (
    <div className="d-flex justify-content-center">
      {type == "forgot_username" ? (
        <div className="pt-5 pb-5" style={{ width: "80%" }}>
          <h1>Forgot User Name</h1>
          <p style={{ color: "#717171" }}>Please fill in this form.</p>
          <hr />

          <p className="fw-bold mt-5">Your Email :</p>
          <div class="input-group mb-3" style={{ width: "100%" }}>
            <input
              class="form-control"
              id="username"
              name="username"
              placeholder="Your email"
              type="text"
              value={forgotUsername}
              onChange={(v) => setForgotUsername(v.target.value)}
              style={{ fontSize: 16, height: 50 }}
            />
          </div>

          <hr />
          <button
            type="button"
            class="btn btn-success btn-lg"
            style={{ width: "100%", marginTop: 30, backgroundColor: "green" }}
            onClick={() => onSubmitForgotUsername()}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="pt-5 pb-5" style={{ width: "80%" }}>
          <h1>Forgot Password</h1>
          <p style={{ color: "#717171" }}>Please fill in this form.</p>
          <hr />

          <p className="fw-bold mt-5">Your Name or Email :</p>
          <div class="input-group mb-3" style={{ width: "100%" }}>
            <input
              class="form-control"
              id="username"
              name="username"
              placeholder="Your name or email"
              type="text"
              value={forgotPassword}
              onChange={(v) => setForgotPassword(v.target.value)}
              style={{ fontSize: 16, height: 50 }}
            />
          </div>

          <hr />
          <button
            type="button"
            class="btn btn-success btn-lg"
            style={{ width: "100%", marginTop: 30, backgroundColor: "green" }}
            onClick={() => onSubmitForgotPassword()}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
