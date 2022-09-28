import { useState } from "react";
import "./styles.css";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import Web3 from "web3";
// import './styles/globals.css'
import HexEventRegistration from "./contracts/ethereum/HexEventRegistration.json";



const customNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.maticvigil.com/"', // Polygon RPC URL
  chainId: 80001, // Polygon chain id
}

// Setting network to Polygon - Testnet
// const magic = new Magic('pk_live_04567F8F48C77DB6', { network: customNodeOptions });
const magic = new Magic("pk_live_73AAE8A5F81B1CF3", {
  network: "rinkeby",
  // network: customNodeOptions,
  locale: "en_US",
  extensions: [new ConnectExtension()]
});
const web3 = new Web3(magic.rpcProvider);

export default function App() {
  const [account, setAccount] = useState(null);

  // const sendTransaction = async () => {
  //   const publicAddress = (await web3.eth.getAccounts())[0];
  //   console.log("address" + msg.sender);
  //   const txnParams = {
  //     from: publicAddress,
  //     to: publicAddress,
  //     value: web3.utils.toWei("0.01", "ether"),
  //     gasPrice: web3.utils.toWei("30", "gwei")
  //   };
  //   web3.eth
  //     .sendTransaction(txnParams)
  //     .on("transactionHash", (hash) => {
  //       console.log("the txn hash that was returned to the sdk:", hash);
  //     })
  //     .then((receipt) => {
  //       console.log("the txn receipt that was returned to the sdk:", receipt);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const login = async () => {
    web3.eth
      .getAccounts()
      .then((accounts) => {
        setAccount(accounts?.[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const signMessage = async () => {
  //   const publicAddress = (await web3.eth.getAccounts())[0];
  //   const signedMessage = await web3.eth.personal
  //     .sign("My Message", publicAddress, "")
  //     .catch((e) => console.log(e));
  //   console.log(signedMessage);
  // };

  // const showWallet = () => {
  //   magic.connect.showWallet().catch((e) => {
  //     console.log(e);
  //   });
  // };

  const createNft = () => {
    magic.connect.showWallet().catch((e) => {
      console.log(e);
    });
  };


  async function eventRegstrationWA(){
    // const web3Modal = new Web3Modal()
    // const provider = await web3Modal.connect()
    // const web3 = new Web3(provider)
    // const networkId = await web3.eth.net.getId()
    const HexEventRegistrationContractAddress = "0xaae23273cafe659c79ac32076338a38216f57e73";
    const HexEventRegistrationContract = new web3.eth.Contract(HexEventRegistration.abi, HexEventRegistrationContractAddress)
    // const accounts = await web3.eth.getAccounts()
    // const { gmail, name, organisation, designation } = formInput
    // const url = await uploadToIPFS()
    // @aurguments imageUrl,gmail,name,organisation, designation
    HexEventRegistrationContract.methods.createHexRegTokenWithAccount("https://gateway.pinata.cloud/ipfs/QmWyUTERPpKzY7tzA2iDzfzktNG8PSjj9PXZYU4Hx2jFB4", "","","","")
    .send({ from: account}).on('receipt', function () {
        console.log('listed');
        router.push('/');
    });
    return 0;
  }

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e) => {
      console.log(e);
    });
    setAccount(null);
  };

  return (
    <div className="app">
      <h2>Magic Connect</h2>
      {!account && (
        <button onClick={login} className="button-row">
          Sign In
        </button>
      )}

      {account && (
        <>
          
          {/* <button onClick={showWallet} className="button-row">
            Show Wallet
          </button>
          <button onClick={sendTransaction} className="button-row">
            Send Transaction
          </button>
          <button onClick={signMessage} className="button-row">
            Sign Message
          </button> */}
          <button onClick={eventRegstrationWA} className="button-row">
            Register With hexNFT
          </button>
          <button onClick={disconnect} className="button-row">
            Disconnect
          </button>
        </>

      )}
    </div>
  );
}
