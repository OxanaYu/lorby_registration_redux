import React from "react";
import styles from "./imageContent.css";
import illustration from "../assets/illustration.png";

const ImageContent = () => {
  return (
    <div className={styles.image_main}>
      <div className={styles.image}>
        <div className={styles.image__top}>
          <img src={illustration} alt="" />
        </div>
        <div className={styles.image__bottom}>
          <p className={styles.image__lorby}>Lorby</p>
          <p className={styles.image__text}>Твой личный репетитор</p>
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
