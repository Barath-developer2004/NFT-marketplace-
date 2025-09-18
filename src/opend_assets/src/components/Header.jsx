import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Minter from "./Minter";
import Gallery from "./Gallery";
import Item from "./Item";
import Discover from "./Discover"; // Import Discover component
import DemoNFT from "./DemoNFT"; // Import the demo NFT component
import { opend } from "../../../declarations/opend";
import CURRENT_USER_ID from "../index";

function Header() {
  const [userOwnedGallery, setOwnedGallery] = useState();
  const [listingGallery, setListingGallery] = useState();
  const [userListedNFTs, setUserListedNFTs] = useState([]);

  async function getNFTs() {
    // Get user's owned NFTs (NFTs in their wallet)
    const userNFTIds = await opend.getOwnedNFTs(CURRENT_USER_ID);
    console.log("User owned NFTs:", userNFTIds);
    
    // Get all listed NFTs and filter for user's listed NFTs
    const listedNFTIds = await opend.getListedNFTs();
    console.log("All listed NFTs:", listedNFTIds);
    
    // Filter to get user's listed NFTs
    const userListedNFTIds = [];
    for (const nftId of listedNFTIds) {
      try {
        const originalOwner = await opend.getOriginalOwner(nftId);
        if (originalOwner.toText() === CURRENT_USER_ID.toText()) {
          userListedNFTIds.push(nftId);
        }
      } catch (error) {
        console.log("Error checking owner for NFT:", nftId.toText());
      }
    }
    
    console.log("User's listed NFTs:", userListedNFTIds);
    
    // Set up owned NFTs gallery (for collection page)
    setOwnedGallery(
      <Gallery title="My Owned NFTs" ids={userNFTIds} role="collection" />
    );
    
    // Set up user's listed NFTs
    setUserListedNFTs(userListedNFTIds);

    // Set up discover gallery (all listed NFTs)
    setListingGallery(
      <Gallery title="Discover" ids={listedNFTIds} role="discover" />
    );
  }

  useEffect(() => {
    getNFTs();
  }, []);

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="app-root-1">
        <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
          <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
            <div className="header-left-4"></div>
            <img className="header-logo-11" src={logo} />
            <div className="header-vertical-9"></div>
            <Link to="/">
              <h5 className="Typography-root header-logo-text">OpenD</h5>
            </Link>
            <div className="header-empty-6"></div>
            <div className="header-space-8"></div>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/discover">Discover</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/minter">Minter</Link>
            </button>
            <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
              <Link to="/collection">My NFTs</Link>
            </button>
          </div>
        </header>
      </div>
      <Switch>
        <Route exact path="/">
          <img className="bottom-space" src={homeImage} />
        </Route>
        <Route path="/discover">
          <Discover /> {/* Use the custom Discover component for presentations */}
        </Route>
        <Route path="/minter">
          <Minter />
        </Route>
        <Route path="/collection">
          <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">My NFTs Collection</h3>
            
            {/* Section 1: NFTs Available to Sell (Owned NFTs) */}
            <div className="nft-section">
              <h4 className="section-title">🎨 My Owned NFTs (Available to Sell)</h4>
              <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
                <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                  <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                    {/* Display Demo NFT (representing purchased NFTs that can be sold) */}
                    <DemoNFT />
                    {/* Display user's owned NFTs */}
                    {userOwnedGallery && userOwnedGallery.props && userOwnedGallery.props.children}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Section 2: NFTs Listed for Sale */}
            <div className="nft-section">
              <h4 className="section-title">🏪 My Listed NFTs (Currently for Sale)</h4>
              <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
                <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                  <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                    {userListedNFTs.length > 0 ? (
                      userListedNFTs.map((nftId) => (
                        <Item id={nftId} key={nftId.toText()} role="collection" />
                      ))
                    ) : (
                      <div className="no-nfts-message">
                        <p>No NFTs currently listed for sale</p>
                        <small>List your NFTs above to start selling!</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route path="/demo-nft">
          <div className="gallery-view">
            <h3 className="makeStyles-title-99 Typography-h3">My NFTs</h3>
            <div className="disGrid-root disGrid-container disGrid-spacing-xs-2">
              <div className="disGrid-root disGrid-item disGrid-grid-xs-12">
                <div className="disGrid-root disGrid-container disGrid-spacing-xs-5 disGrid-justify-content-xs-center">
                  <DemoNFT />
                  {userOwnedGallery && userOwnedGallery.props && userOwnedGallery.props.children}
                </div>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Header;
