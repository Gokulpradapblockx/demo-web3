/* eslint-disable no-useless-concat */
import "./App.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./GiveForeverABI.json";
const contractAddress = "0xeEf5cBC6FA722A01c816Ca598e05505a09e39484"; // Goerli & Mainnet


function App() {
  // const provider = useEthter();
  const [account, setAccount] = useState("");
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState();
  const [depositValue, setDepositValue] = useState(0);
  
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractABI, provider);  
const wei = 10000000000000000;
  const { ethereum } = window;
  const connectWallet = async () => {
    if (window.ethereum !== undefined) {
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(account[0]);
    } else if (!ethereum) {
      alert("install metamask");
    }
  };
  const getBalance = async () => {
    const balance = await provider.getBalance(contractAddress);
    setBalance(ethers.utils.formatEther(balance));
  }
  const handleDepositChange = (e) => {
    setDepositValue(e.target.value)
  }
  getBalance()
  const onhandleSubmit = async(e) => {
    if (!account) {
      alert("connect the Wallet First");
    }
  else {
     e.preventDefault();
    const ethValue = ethers.utils.parseUnits(depositValue)
    const deposit = await contract.deposit({value: ethValue});
    await deposit.wait();
    const balance = await provider.getBalance(contractAddress);
    setBalance(ethers.utils.formatEther(balance));
    console.log(ethValue);
  }
  };
  const inputValue = (e) => {
    setInput(e.target.value);
  };
  const deposit = async () => {
    if (!account) {
      alert("connect the Wallet First");
    } else {
      
      console.log(typeof depositValue);
    }
  };
  const withdraw = async () => {    
    if (!account) {
      alert("connect the Wallet First");
    } else {
      console.log("withdraw" + " " + depositValue);
    }
  };

  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>
      <form onSubmit={onhandleSubmit}>
      <input type="number" className="form-control" placeholder="0" onChange={handleDepositChange} value={depositValue} /> <br />
        <button onClick={deposit}>Deposit</button> <br />
        <button onClick={withdraw}>withdraw</button>
      </form>
      <p>
        {account.slice(0, 4)}...{account.slice(38)}
      </p>
      <p>{balance}</p>
    </div>
  );
}

export default App;
