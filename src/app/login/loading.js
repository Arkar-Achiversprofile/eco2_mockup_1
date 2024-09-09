import React from "react";
import styles from '../eco2/shops/shops.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingBack}>
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
}
