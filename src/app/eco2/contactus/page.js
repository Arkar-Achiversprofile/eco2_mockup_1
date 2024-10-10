"use client";
import React, { useContext, useState } from "react";
import NavBar from "../../components/NavBar";
import { color } from "../../components/color";
import { adminEmail, baseUrl } from "../../controller/baseUrl";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";
import Footer from "../../components/Footer";

export default function ContactUs() {
  const { isMobile } = useContext(AppContext);
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
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-md-7 col-11">
          <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
            Contact Us
          </h2>
          <p style={{ color: color.grey, marginTop: 50 }}>
            Please feel free to contact us by phone or email. Or alternatively
            fill in the form below, and will get back to you as soon as
            possible.
          </p>
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
        <div className="col-md-4 col-11 d-flex">
          <div
            style={{
              width: "90%",
              padding: 30,
              alignSelf: "center",
              backgroundColor: color.snowWhite,
              borderRadius: 10
            }}
          >
            <p style={{ color: color.grey, fontWeight: "bold" }}>Address</p>
            <div style={{ color: color.grey, marginTop: -10 }}>
              <i class="bi bi-geo-alt-fill"></i>
              <a
                style={{ color: color.grey, marginLeft: 5 }}
                href={`//www.google.com.sg/maps/place/Singapore+769201/@1.413811,103.8180138,15z/data=!3m1!4b1!4m6!3m5!1s0x31da140edbab175f:0xd1f5b85af98db0d7!8m2!3d1.413811!4d103.828335!16s%2Fg%2F11p4cqm_8j?entry=ttu&g_ep=EgoyMDI0MTAwNS4yIKXMDSoASAFQAw%3D%3D`}
              >
                91 Lor Chencharu, Singapore 769201
              </a>
            </div>

            <div style={{ color: color.grey, marginTop: 30 }}>
              <i class="bi bi-clock"></i>
              <a style={{ color: color.grey, textDecoration: "none", marginLeft: 5 }}>
                Mon - Fri, 9am - 6pm
              </a>
            </div>

            <p style={{ color: color.grey, fontWeight: "bold", marginTop: 30 }}>
              Phone
            </p>
            <div style={{ color: color.grey, marginTop: -10 }}>
              <i class="bi bi-telephone-fill"></i>
              <a style={{ color: color.grey, textDecoration: "none", marginLeft: 5 }}>
                65 8223 1434
              </a>
            </div>
            <p style={{ color: color.grey, fontWeight: "bold", marginTop: 30 }}>
              Email Address
            </p>
            <div style={{ color: color.grey, marginTop: -10 }}>
              <i class="bi bi-envelope-fill"></i>
              <a style={{ color: color.grey, textDecoration: "none", marginLeft: 5 }}>
                info@otolithenrichment.com
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ width: isMobile ? "90%" : "40%", margin: "20px auto" }}>
        
      </div> */}

      <Footer />
    </div>
  );
}
