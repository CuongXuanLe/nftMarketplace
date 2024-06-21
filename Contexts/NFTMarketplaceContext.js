import React, { useEffect, useState, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  TransferFundsAddress,
  TransferFundsABI,
} from "./constants";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    console.log("check connect: ", web3Modal, connection, provider);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

const fetchTransferFundsContract = (signerOrProvider) =>
  new ethers.Contract(TransferFundsAddress, TransferFundsABI, signerOrProvider);

//transfer funds func
const connectToTransferFunds = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchTransferFundsContract(signer);
    return contract;
  } catch (error) {
    console.log(
      "Something went wrong while connecting with contract transferFund",
      error
    );
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "hehe hehehehe";

  //useState
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

  const checkContract = async () => {
    const contract = await connectingWithSmartContract();
    console.log("contract: ", contract);
  };

  //check if wallet is connected
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Account Found");
        setOpenError(true);
        setError("No Account Found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setError(true);
    }
  };

  // useEffect(() => {
  //   checkIfWalletConnected();
  // }, []);

  //connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setError("Install MetaMask"), setOpenError(true);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connect Wallet: ", accounts);

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      setError("Error while connecting to wallet");
      setOpenError(true);
    }
  };

  //upload to pinata functions
  const uploadToPinata = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "Post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `7728207587f86331e49b`,
            pinata_secret_api_key: `6d8e5496cb6fb9d3e38a524b6912347dc932fe6fe9a65029ecd738e30be48d24`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        return ImgHash;
      } catch (error) {
        setError("Unable to upload image to pinata");
        setOpenError(true);
      }
    }
  };

  const createNFT = async (
    name,
    price,
    image,
    description,
    router,
    website,
    category
  ) => {
    if (!name || !description || !price || !image)
      return console.log("Data is missing");

    const data = JSON.stringify({
      name,
      description,
      image,
      website,
      category,
    });
    try {
      const response = await axios({
        method: "Post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: `7728207587f86331e49b`,
          pinata_secret_api_key: `6d8e5496cb6fb9d3e38a524b6912347dc932fe6fe9a65029ecd738e30be48d24`,
          "Content-Type": "application/json",
        },
      });
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      console.log(url);
      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //createSale
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();
      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
    }
  };

  //fetch nft function
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-amoy.g.alchemy.com/v2/FbVL2i2loSp-ZDdf5HWnur4UzvNzhhx8"
      );

      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description, website, category },
            } = await axios.get(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              website,
              category,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      setError("Error while fetching NFTs");
      setOpenError(true);
    }
  };

  //fetch my nft or list nfts
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type == "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);

            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (currentAccount) {
      fetchMyNFTsOrListedNFTs();
    }
  }, []);

  //buy nfts functions
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      console.log("check: ", nft);
      console.log("contract: ", contract);

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      console.log("check transaction: ", transaction, price);

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("buy nfts faileddddd");
      setOpenError(true);
    }
  };

  //transfer fund
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds(currentAccount);
        console.log("transfer ether: ", address, ether, message);

        const unFormattedPrice = ethers.utils.parseEther(ether);
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormattedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormattedPrice,
          message
        );

        console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionsCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const availableTransactions = await contract.getAllTransactions();
        const readTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkContract,
        checkIfWalletConnected,
        connectWallet,
        uploadToPinata,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        createSale,
        buyNFT,
        currentAccount,
        titleData,
        openError,
        error,
        setOpenError,
        transferEther,
        loading,
        accountBalance,
        transactionCount,
        transactions,
        getAllTransactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
