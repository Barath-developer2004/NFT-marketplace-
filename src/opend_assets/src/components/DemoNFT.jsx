import React from "react";
import cryptodunk1 from "../images/cryptodunk1.png";

function DemoNFT() {
  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={cryptodunk1}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            CryptoPunk <span className="purple-text">#123</span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: You
          </p>
        </div>
      </div>
    </div>
  );
}

export default DemoNFT;
