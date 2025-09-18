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
            
            {/* Display demo NFTs for presentation */}
            {demoNFTs.map((nft) => (
              <div className="disGrid-root disGrid-item" key={nft.id}>
                <div className="primary-backing" style={{minHeight: "250px", width: "200px", margin: "10px"}}>
                  <div style={{padding: "10px"}}>
                    <img 
                      className="discovery-image"
                      src={nft.img} 
                      style={{height: "150px", width: "100%", objectFit: "cover"}}
                    />
                    <h2 style={{fontSize: "18px", padding: "5px 0"}}>{nft.name}</h2>
                    <p style={{fontSize: "14px", color: "#11111D"}}>{nft.price} DANG</p>
                    <div className="lds-ellipsis" hidden={loaderHidden}>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <button 
                      className="btn btn-primary"
                      style={{width: "100%", marginTop: "10px"}}
                      onClick={() => handleBuy(nft)}
                      disabled={!loaderHidden}
                    >
                      Buy
                    </button>
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
