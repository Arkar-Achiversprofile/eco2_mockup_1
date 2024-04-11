import React from "react";
import styles from './Components.module.css'

function Footer() {
  return (
    <footer
      className="text-center text-lg-start bg-body-dark text-muted mt-5 pb-5"
      style={{ backgroundColor: "#333333" }}
    >
      <section className="">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="d-flex flex-column align-items-start col-md-4 col-lg-5 col-xl-4 mx-auto mt-5 mb-4">
              <h5 className="fw-bold mb-4 text-white">About</h5>
              <p className="text-start" style={{ color: "#717171" }}>
                Otolith Enrichment is an education company in the areas of aquaculture, agriculture and environmental science.
              </p>
              <button
                type="button"
                class="btn btn-success rounded-pill"
                style={{ backgroundColor: "green", width: 150 }}
              >
                Read More
              </button>
            </div>

            <div className="d-flex flex-column align-items-start col-md-3 col-lg-2 col-xl-2 mx-auto mt-5 mb-4">
              <h5 className="fw-bold mb-4 text-white">Quick Menu</h5>
              <p>
                <a href="#!" className={styles.aTag}>
                  News
                </a>
              </p>
              <p>
                <a href="#!" className={styles.aTag}>
                  Our Eco²Balance Shop
                </a>
              </p>
              <p>
                <a href="#!" className={styles.aTag}>
                  Our Programs
                </a>
              </p>
              <p>
                <a href="#!" className={styles.aTag}>
                  Our Sustainability Projects
                </a>
              </p>
              <p>
                <a href="#!" className={styles.aTag}>
                  Contact Us
                </a>
              </p>
            </div>

            <div className="d-flex flex-column align-items-start col-md-3 col-lg-2 col-xl-2 mx-auto mt-5 mb-4">
              <h5 className="fw-bold mb-4 text-white">Our Social Media</h5>
              <p>
                <a href="#!" className={styles.aTag}>
                  <i class="bi bi-facebook" style={{fontSize: 30}}></i>
                </a>
              </p>
              <p>
                <a href="#!" className={styles.aTag}>
                  <i class="bi bi-instagram" style={{fontSize: 30}}></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 mt-5" style={{ color: "#ffffff" }}>
        Copyright © Otolith Enrichment
        {/* <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a> */}
      </div>
    </footer>
  );
}

export default Footer;
