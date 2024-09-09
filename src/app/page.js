"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { image } from "./assets";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import NavBar from "./components/NavBar";
import { stripe, stripePromise } from "./api/stripe-paymentintent";
import { useContext, useEffect } from "react";
import AppContext from "./context/AppContext";
import { color } from "./components/color";
import { imageUrl } from "./controller/baseUrl";

export default function Home() {
  const { userInfo } = useContext(AppContext);
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 500px) and (max-width: 850px)",
  });

  const getPaymentData = async () => {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });
  };

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const onClickJoinNow = async () => {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      "pi_3PIkChJYYD0LqRPz1YDwgGKP"
    );
    router.push(
      "/eco2/shops/paynowpaylah" +
        "?" +
        createQueryString("clientSecret", paymentIntent.client_secret) +
        "&" +
        createQueryString("paymentIntentId", paymentIntent.id)
    );
  };
  return (
    <div className="">
      <NavBar />
      <video autoPlay muted loop className={styles.backgroundVideo}>
        <source src="/eco2_home_back.mp4" type="video/mp4" />
      </video>

      {/* <div className={styles.main}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
          }}
        >
          <Image alt="" src={image.mainLogo} width={250} height={120} />
          <p style={{ fontSize: 18, textAlign: "center", marginTop: 10 }}>
            Earn Green Currency by participating in our projects to purchase
            items from <a href="/eco2" style={{color: 'skyblue', cursor: 'pointer', textDecoration: 'none'}}>our Eco²Balance Shop</a>
          </p>
        </div>
      </div> */}
      {/* qrUrl: '',
    greenCurrencyBalance: 0,
    userName: '' */}
      {userInfo.userName ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-1">
          <p style={{ color: color.green, fontSize: isMobile ? 25 : 30 }}>
            Welcome back, {userInfo.userName}
          </p>
          <Image
            alt=""
            src={imageUrl + userInfo.qrUrl}
            width={isMobile ? 200 : 250}
            height={isMobile ? 200 : 250}
          />
          <p style={{ color: color.green, fontSize: isMobile ? 25 : 30 }}>
            Green Currency Balance: {userInfo.greenCurrencyBalance}
          </p>
        </div>
      ) : null}

      <div className="container" style={{ paddingTop: 30 }}>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-12 col-lg-6">
            <Image
              alt=""
              src={image.mainProject}
              width={500}
              height={350}
              layout="responsive"
            />
          </div>
          <div
            className="d-flex justify-content-center align-items-center col-12 col-lg-4"
            style={{ marginTop: isTablet ? 30 : 0 }}
          >
            <div className="d-flex flex-column justify-content-center">
              <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>
                OUR SUSTAINABILITY PROJECTS
              </h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Join us in our Green initiatives!
              </p>
              <p style={{ fontFamily: "serif", fontSize: 14 }}>
                Be a volunteer in our sustainable projects; make new friends,
                learn new skills and earn green currency which you can use for
                purchasing items from our Eco²Balance Shop.
              </p>
              <button
                type="button"
                class="btn btn-success rounded-pill"
                style={{ width: 150, backgroundColor: "green" }}
                onClick={() => onClickJoinNow()}
              >
                Join Now
              </button>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 100 }}>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="d-flex justify-content-center align-items-center col-12 col-lg-4">
            <div className="d-flex flex-column justify-content-center">
              <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>
                OUR PROGRAMS
              </h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Learn about sustainability!
              </p>
              <p style={{ fontFamily: "serif", fontSize: 14 }}>
                We offer a range of aquaculture, agriculture and environment
                focused programs catered for students, families as well as
                organizations.
              </p>
              <button
                type="button"
                class="btn btn-success rounded-pill"
                style={{ width: 150, backgroundColor: "green" }}
                onClick={() => router.push("/eco2/program")}
              >
                Learn More
              </button>
            </div>
          </div>
          <div
            className="col-12 col-lg-6"
            style={{ marginTop: isTablet ? 30 : 0 }}
          >
            <Image
              alt=""
              src={image.mainProgram}
              width={500}
              height={350}
              layout="responsive"
            />
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 100 }}>
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-12 col-lg-6">
            <Image
              alt=""
              src={image.mainShop}
              width={500}
              height={350}
              layout="responsive"
            />
          </div>
          <div
            className="d-flex justify-content-center align-items-center col-12 col-lg-5"
            style={{ marginTop: isTablet ? 30 : 0 }}
          >
            <div className="d-flex flex-column justify-content-center">
              <h3 style={{ fontFamily: "serif", fontWeight: "bold" }}>
                OUR ECO²BALANCE APP
              </h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Sustainable based, sustainably produced!
              </p>
              <p style={{ fontFamily: "serif", fontSize: 14 }}>
                The Eco²Balance App was initiated to demonstrate circularity
                within communities through various green initiatives. The name,
                Eco 2 Balance, signifies the importance of ecological and
                economic balance in our society today. Participants can earn
                Green Currency by participating in our Sustainability Projects,
                which can be used for offsetting the cost of purchase for
                products and services offered by our Green partners, through our
                Eco²Balance shop.To participate, click here to register for an
                account
              </p>
              <button
                type="button"
                class="btn btn-success rounded-pill"
                style={{ width: 150, backgroundColor: "green" }}
                onClick={() => router.push("/eco2/shops")}
              >
                Shop Now
              </button>
            </div>
          </div>
          {/* <div className="col-lg-1"></div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
