import { useState } from "react";
import "./styles.css";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Web3 from "web3";
// import './styles/globals.css'
import HexEventRegistration from "./contracts/ethereum/HexEventRegistration.json";
//css customization
import 'bootstrap/dist/css/bootstrap.min.css';
// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Montserrat:ital,wght@0,200;0,300;0,500;0,700;1,100;1,200;1,300&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500&display=swap');
</style>
//custom style sheet
import './styles/CustomCss.css';



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
      {!account && (
        // <button onClick={login} className="button-row">
        //   Sign In
        // </button>
        <div className="container pt-4">
          <div className="row main-container">

         
          <div className="col-md-12 col-lg-4 col-sm-12 text-md-left">
          <img className="logo" src={require('./static/logo@2x.png')} alt=""/>
          <div className="main-containers row text-md-left text-center">
            
          <div class="d-flex flex-column text-md-left h-100 justify-content-around">
          <div className="row data h-100">

<div className="subLine">
    Join in the conversation
</div>
<div className="tagline">
    Demystifying Metaverse, how brands can leverage the potential of NFTs
</div>
</div>

<div className="row date-containers h-100">
  
<img class= "hide-block" src={require('./static/BlockChain (2).png')}  alt="" />
<span className="grey-line">MARK THE DATE AND TIME</span>
<div className="time-data">

<div className="date">
<FontAwesomeIcon icon={faCalendar} className="fa-regular" />
    <div className="date-data">
        <span>ON TUESDAY</span>
        <span>11 October 2022</span>
    </div>
</div>
<div className="date">
<FontAwesomeIcon icon={faClock} className="fa-regular" />
    <div className="date-data">
        <span>ON STARTS AT</span>
        <span>9.30pm IST & 12pm ET</span>
    </div>
</div>
</div>


<button onClick={login} className="sign-up">
Connect to your Wallet
</button>
</div>

</div>
          </div>
          
          </div>
          <div className="col-md-12 col-lg-8 col-sm-12 text-lg-left right h-full">
          <div className="row row-md-12">
                    <div className="hidden-speakers">
                      Our Speakers
                    </div>
                    <div className="col-md-12 col-lg-12 cards">
                        <img src={require('./static/Atul_Kumthekar.png')} alt="Avatar" className="avatar"/>
                        <a href="https://www.linkedin.com/in/atul-kumthekar-b109021/"><LinkedInIcon /></a>
                        <div className="moderator">MODERATOR</div>
                        <div className="containers">
                            <h4><b>Atul Kumthekar</b></h4>
                            <p>Consultant at Hexaview Technologies inc.</p>
                        </div>
                    </div>

                </div>
                <div className="row row-md-12">
                    <div className=" col-md-12  cards">
                        <img src={require('./static/Garima_Singh.jfif')} alt="Avatar" className="avatar"/>
                        <a href="https://www.linkedin.com/in/garima-singh-03907229/"><LinkedInIcon /></a>
                        <div className="containers">
                            <h4><b>Graima Singh</b></h4>
                            <p>Blockchain Research Analyst at TLV Fintech Solutions</p>
                        </div>
                    </div>
                    
                    <div className="col-md-12 cards">
                        <img src={require('./static/Dr_Sujata.jfif')} alt="Avatar" className="avatar"/>
                        <a href="https://www.linkedin.com/in/dr-sujata-seshadrinathan-341621a/"><LinkedInIcon /></a>
                        <div className="containers">
                            <h4 ><b>DR. Sujata Seshadrinathan</b></h4>
                            <p className="sujata">Adjunct Professor at SP Jain School of Global Management</p>
                        </div>
                    </div>
                </div>
                <div className="row row-md-12">
                    <div className="col-md-12 cards">
                        <img src={require('./static/kamlesh.JPG')} alt="Avatar" className="avatar"/>
                        <a href="https://www.linkedin.com/in/kamlesh-nagware-1456094b/"><LinkedInIcon /></a>
                        <div className="containers">
                            <h4><b>Kamlesh Nagware</b></h4>
                            <p>CTO at Snapper Future Tech</p>
                        </div>
                    </div>
                    <div className="col-md-12 cards">
                        <img src={require('./static/Shilpa.jfif')} alt="Avatar" className="avatar"/>
                        <a href="https://www.linkedin.com/in/deshpandeshilpa/"><LinkedInIcon /></a>
                        <div className="containers">
                            <h4><b>Shilpa Deshpande</b></h4>
                            <p>Staff Data Scientist at Chainalysis inc.</p>
                        </div>
                    </div>
                </div>
          </div>
          </div>
        </div>

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
         <div className="main-container-box">
  <div className="navbar">
        <img className="logo" src={require('./static/logo@1x.png')} alt=""/></div>


    <div className="body-container">



        <div className="col col-sm-12 col-lg-6 col-md-12">

            <h2>Lorem ipsum dolor sit amet consecutor</h2>
            <ul>
                <li> Lorem dolor amet sit </li>
                <li>
                    Lorem ipsum dolor sit amet consecutor adipiscingLorem ipsum dolor sit amet
                </li>
                <li>Lorem ipsum dolor sit amet consecutor</li>
                <li> Lorem dolor amet sit </li>
                <li>
                    Lorem ipsum dolor sit amet consecutor adipiscingLorem ipsum dolor sit amet
                </li>
                <li>Lorem ipsum dolor sit amet consecutor</li>
                <li> Lorem dolor amet sit </li>
                <li>
                    Lorem ipsum dolor sit amet consecutor adipiscingLorem ipsum dolor sit amet
                </li>
                <li>Lorem ipsum dolor sit amet consecutor</li>
            </ul>
        </div>

        <div className="button-container col-lg-6 col-md-12">
<button onClick={eventRegstrationWA} className="big-button big-button-solid">
Claim Your Free NFT
          </button>

    </div>
    </div>
         </div>
        </>

      )}
    </div>
  );
}
