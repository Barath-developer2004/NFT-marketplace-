# Code Citations

## License: unknown
https://github.com/Hardikmahto/CryptoDunks/tree/6bad2ca2b502232f50835c83aee75d445e4f24b0/src/opend/main.mo

```
: async Text {
  var item : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
    case null return "NFT does not exist.";
    case (?result) result;
  };

  let owner = await item.getOwner();
  if (Principal.
```


## License: unknown
https://github.com/HabibUrRehmanBhattii/NFTs_Marketpalce_Web3_Motoko/tree/de62d00b81c7e76dd6bb301e6287361a3a7b41da/src/opend/main.mo

```
exist.";
    case (?result) result;
  };

  let owner = await item.getOwner();
  if (Principal.equal(owner, msg.caller)) {
    let newListing : Listing = {
      itemOwner = owner;
      itemPrice = price;
    };
    mapOfListings.
```


## License: unknown
https://github.com/labbii/OpenSeaBeta/tree/3d26c46b4efaaf481ab758fa15016a7aabab3cbc/src/opend/main.mo

```
listItem(id: Principal, price: Nat) : async Text {
  var item : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
    case null return "NFT does not exist.";
    case (?result) result;
  };

  let owner = await
```

