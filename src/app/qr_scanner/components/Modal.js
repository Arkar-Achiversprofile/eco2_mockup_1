'use client'

import React from "react";

import style from "./Modal.module.css";
import {color} from "../../components/color"
import { useMediaQuery } from "react-responsive";

export const Modal = ({ onSubmit, onCancel, closeModal, children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  return (
    <div
      className={style.modalContainer}
      onClick={(e) => {
        if (e.target.className === style.modalContainer)
          closeModal();
      }}
    >
      {/* border-radius: 5px;
    padding: 20px;
    background-color: white;
    width: 50%; */}
      <div style={{
        borderRadius: 10,
        padding: 20,
        backgroundColor: color.white,
        width: isMobile ? '80%' : '50%'
      }}>
        <div
          className={style.modalHeader}
          onClick={() => closeModal()}
        >
          <p className={style.close}>&times;</p>
        </div>
        <div className={style.modalContent}>{children}</div>
        <div className={style.modalFooter}>
          <button
            type="submit"
            className="btn btn-info"
            onClick={() => onSubmit()}
            style={{color: color.white}}
          >
            Go Back
          </button>
          {/* <button
            type="submit"
            className="btn btn-danger"
            onClick={() => onCancel()}
          >
            Cancel
          </button> */}
        </div>
      </div>
    </div>
  );
};