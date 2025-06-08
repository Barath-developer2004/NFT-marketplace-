# NFT Marketplace on Internet Computer

A decentralized NFT marketplace built on the Internet Computer blockchain. This project demonstrates the implementation of a full-stack dApp using the Internet Computer's unique capabilities.

## Features

- Mint and list NFTs
- Buy and sell NFTs using DANG tokens
- View NFT collections
- Secure ownership transfers
- Modern UI/UX design

## Technologies Used

- Internet Computer (ICP)
- Motoko
- React.js
- Webpack
- Candid

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local Internet Computer replica:
   ```bash
   dfx start --background
   ```
4. Deploy the canisters:
   ```bash
   dfx deploy
   ```
5. Start the frontend:
   ```bash
   npm start
   ```

## Project Structure

- `src/` - Source code
  - `opend/` - Main canister code
  - `opend_assets/` - Frontend assets
  - `NFT/` - NFT canister code
  - `token/` - Token canister code

## License

MIT License

## Author

Barath 