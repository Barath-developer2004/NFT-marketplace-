import React, { useEffect, useState } from "react";
import Item from "./Item";
import { Principal } from "@dfinity/principal";
import { opend } from "../../../declarations/opend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as tokenIdlFactory } from "../../../declarations/token";
import CURRENT_USER_ID from "../index";
import cryptodunk1 from "../images/cryptodunk1.png";

function Discover() {
  const [listedNFTs, setListedNFTs] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  
  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({ host: localHost });
  //TODO: When deploy live, remove the following line.
  agent.fetchRootKey();
  
  // Demo NFTs for presentation
  const demoNFTs = [
    {
      id: "CryptoPunk #123",
      img: cryptodunk1,
      name: "CryptoPunk",
      price: 35,
      description: "Rare CryptoPunk NFT from the original collection"
    },
  ];
  
  async function handleBuy(nft) {
    console.log("Buy was triggered for demo NFT");
    setLoaderHidden(false);
    
    try {
      // For demo purposes, just show success without actual transfer
      setTimeout(() => {
        alert(`Successfully purchased ${nft.name} for ${nft.price} DANG tokens!`);
        
        // For your presentation: Open a new route with the demo NFT
        window.location.href = "/demo-nft";
        
        setLoaderHidden(true);
      }, 1500);
      
    } catch (error) {
      console.error("Buy error:", error);
      alert("There was an error processing your purchase. See console for details.");
      setLoaderHidden(true);
    }
  }

  async function getNFTs() {
    // Get real listed NFTs from the backend
    const listedNFTIds = await opend.getListedNFTs();
    console.log("Listed NFTs:", listedNFTIds);
    
    if (listedNFTIds.length > 0) {
      setListedNFTs(
        listedNFTIds.map((NFTId) => (
          <Item id={NFTId} key={NFTId.toText()} role="discover" />
        ))
      );
    }
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <div className="gallery-view">
      <h3 className="makeStyles-title-99 Typography-h3">Discover</h3>
      <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
        <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
          <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
            {/* Display real listed NFTs if available */}
            {listedNFTs}
            
            {/* Display demo NFTs for presentation with proper structure */}
            {demoNFTs.map((nft) => (
              <div className="disGrid-item" key={nft.id}>
                <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
                  <img
                    className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
                    src={nft.img}
                  />
                  <div className="lds-ellipsis" hidden={loaderHidden}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className="disCardContent-root">
                    <div className="disButtonBase-root disChip-root makeStyles-price-23 disChip-outlined">
                      <span className="disChip-label">{nft.price} DANG</span>
                    </div>
                    <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
                      {nft.name}
                      <span className="purple-text"> #{nft.id.split('#')[1]}</span>
                    </h2>
                    <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
                      Owner: OpenD
                    </p>
                    <div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
                      <span
                        onClick={() => handleBuy(nft)}
                        className="form-Chip-label"
                      >
                        Buy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
