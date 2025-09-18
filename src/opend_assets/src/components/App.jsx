import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./Item";
import Minter from "./Minter";
// Remove Discover import from App.jsx

function App() {
  // const NFTID = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  return (
    <div className="App">
      <Header />
      {/* <Minter /> */}
      {/* <Item id={NFTID}/> */}
      {/* Remove Discover component from here */}
      <Footer />
    </div>
  );
}

export default App;
