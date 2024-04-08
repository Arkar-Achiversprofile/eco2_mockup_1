import Image from "next/image";
import styles from "./page.module.css";
import {image} from './assets'


export default function Home() {
  return (
    <div className="">
      <div className={styles.main}
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
            items from <a href="/shops" style={{color: 'skyblue', cursor: 'pointer', textDecoration: 'none'}}>our Eco²Balance Shop</a>
          </p>
        </div>
      </div>
      <div className="container" style={{paddingTop: 50}}>
        <div className="row">
        <div className="col-12 col-lg-6">
          <Image alt="" src={image.mainProject} layout="responsive"/>
          </div>
          <div className="col-12 col-lg-6">
            <h1>OUR SUSTAINABILITY PROJECTS</h1>
            <p>Join us in our Green initiatives!</p>
            <p>Be a volunteer in our sustainable projects; make new friends, learn new skills and earn green currency which you can use for purchasing items from our Eco²Balance Shop.</p>
            <button type="button" class="btn btn-success">Success</button>
          </div>
        </div>
      </div>
    </div>
  );
}
