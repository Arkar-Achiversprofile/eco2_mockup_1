"use client";
import React, { useContext, useState } from "react";
import NavBar from "../../components/NavBar";
import { color } from "../../components/color";
import { adminEmail, baseUrl } from "../../controller/baseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";

export default function ContactUs() {
  const {isMobile} = useContext(AppContext);
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const onChangeInfo = (text, value) => {
    const newData = { ...contactData };
    newData[text] = value;
    setContactData(newData);
  };
  const onClickSendMessage = () => {
    if (contactData.fullName == "") {
      toast.warn("Please enter Full Name!", {
        position: "top-right",
      });
    } else if (contactData.email == "") {
      toast.warn("Please enter Email!", {
        position: "top-right",
      });
    } else if (contactData.subject == "") {
      toast.warn("Please enter Subject!", {
        position: "top-right",
      });
    } else if (contactData.message == "") {
      toast.warn("Please enter message!", {
        position: "top-right",
      });
    } else {
      try {
        fetch(`${baseUrl}/api/Email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;",
          },
          body: JSON.stringify({
            toEmail: `${adminEmail}`,
            subject: `${contactData.subject}`,
            body: `<html><body>
                  <p>Full Name: ${contactData.fullName}</p> 
                  <p>Email: ${contactData.email}</p> 
                  <p>Message: ${contactData.message}</p> 
                  </body></html>`,
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
            setContactData({
              fullName: "",
              email: "",
              subject: "",
              message: "",
            });
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
      <ToastContainer />
      <NavBar />
      <div style={{ width: isMobile ? "90%" : "40%", margin: "20px auto" }}>
        <h2 style={{ textAlign: "center" }}>Contact Us</h2>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="fullname" class="form-label">
            Full Name:
          </label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="Enter Full Name"
            value={contactData.fullName}
            onChange={(e) => onChangeInfo("fullName", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="contactEmail" class="form-label">
            Email:
          </label>
          <input
            type="text"
            class="form-control"
            id="contactEmail"
            placeholder="Enter Email"
            value={contactData.email}
            onChange={(e) => onChangeInfo("email", e.target.value)}
          />
        </div>
        <div className="" style={{ paddingTop: 10 }}>
          <label for="subject" class="form-label">
            Subject:
          </label>
          <input
            type="text"
            class="form-control"
            id="subject"
            placeholder="Enter Subject"
            value={contactData.subject}
            onChange={(e) => onChangeInfo("subject", e.target.value)}
          />
        </div>

        <div className="" style={{ paddingTop: 10 }}>
          <label for="message" class="form-label">
            Message:
          </label>
          <textarea
            type="text"
            class="form-control"
            id="message"
            placeholder="Enter Message"
            rows={3}
            value={contactData.message}
            onChange={(e) => onChangeInfo("message", e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-info"
          style={{ color: color.white, marginTop: 10 }}
          onClick={onClickSendMessage}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
