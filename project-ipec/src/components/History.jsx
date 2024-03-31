import React, { useEffect ,useState,useContext} from "react";
import { ethers } from "ethers";
import abi from '../abi/project.json'

import context from '../context/SiteContext.js'
import { Link } from "react-router-dom";
const History = ()=>{
    const {walletAddress,contractAdd,handleAlerts,setWalletAddress}=useContext(context)
    const [fileData,setFileData]=useState(null)
    const infoStyle = {

        box: {
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f8f9fa"
        },
        h: {
            color: "#28a745",
            fontSize: "24px",
            marginBottom: "20px"
        }

    }
if(localStorage.getItem('data'))
    {
        useEffect(()=>{
            

            async function getFile(){
            if(window.ethereum){
                
            
                    try {
                        const accounts = await window.ethereum.request({
                            method: "eth_requestAccounts",
                        });
            
                        console.log(accounts)
                        setWalletAddress(accounts[0]);
                        console.log(walletAddress)
                        if (walletAddress === 'null')
                            handleAlerts(`Wallet Connected Successfully`, 'success')
                    } catch (error) {
                        handleAlerts(`${error.message}`, 'danger')
                    }
            
                
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum)
                    const signer = await provider.getSigner(walletAddress)
                    const addFile = new ethers.Contract(contractAdd, abi.abi, signer)
                    const chainData=await addFile.listAllFileDetails()
                    function replacer(key, value) {
                        if (typeof value === 'bigint') {
                            return value.toString();
                        }
                        return value;
                    }
                    const resultdata = JSON.parse(JSON.stringify(chainData,replacer));
                    setFileData(resultdata)
                    console.log(resultdata)
                }
                catch (err) {
                    if (err.code === 'INVALID_ARGUMENT'&&String(err.value)==='NaN'){
                        handleAlerts(`${err.code}: Serial Number must be a Number`, 'warning')
                    }
                    else 
                        // handleAlerts(`${err}`, 'success')
                        console.log(err)
                }
              
              }
              else
              {handleAlerts('Please install MetaMask','warning')
              } 
            }
            getFile();
        },[walletAddress])
    }
    const timeconverter = (stamp) => {
        let time = new Date(stamp * 1000)
        return time;

    }

return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
          {/* <!-- Toggle button --> */}
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarCenteredExample"
            aria-controls="navbarCenteredExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarCenteredExample"
          >
            {/* <!-- Left links --> */}
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to={'/login'}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a
                  type="button"
                  className="nav-link "
                  
                >{walletAddress!=='null'?"Wallet connected":"Connect wallet"}
                </a>
              </li>
              <li className="nav-item">
                <p className="nav-link active" >
                  History
                </p>
              </li>
              
              
              
            </ul>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
        <h1 className='mt-3 text-center'>File History</h1>
            <div className="row d-flex justify-content-center align-iteams-center flex-column" style={{ margin: 'auto',minHeight:"100vh" }}>
                {fileData && fileData.map((file, index) => (
                   
                    
                    <div key={index} className="card mt-3" style={{ margin: "auto", width: "50rem", infoStyle }}>
                        <div className="card-body">
                            {/* <h5 className="card-title">SNO:{product[0]}</h5> */}
                            <h5 className="card-subtitle mb-2 text-muted">File Name:{file[0]}</h5>
                            <h5 className="card-subtitle mb-2 text-muted">File Hash:{file[1]}</h5>
                            {/* <h5 className="card-subtitle mb-2 text-muted">Destination:{product[3]}</h5> */}
                            <h5 className="card-subtitle mb-2 text-muted">TimeStamp:{String(timeconverter(file[2]))}</h5>

                        </div>
                    </div>

                ))}
                </div>

    </>
)
}
export default History