import React, {useContext, useEffect, useState} from 'react';
import Web3 from 'web3';
import {ReactComponent as Addfill} from "../../assets/icon/add-fill.svg"
import {UserContext} from '../../App';
import "./connectWallet.css"
import {login} from "../../api/user";
import {getToken, setToken} from "../../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {getProfile} from "../../api/user";
import {ScoreContext} from "../../contexts/ScoreContext";


import {useAccount, useDisconnect} from "wagmi";
function ConnectWallet() {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { user, setUser } = useContext(UserContext);
    const { score, updateScore } = useContext(ScoreContext);
    const [account, setAccount] = useState('');

    const navigate = useNavigate();
    const connectWallet = async () => {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        login({address: accounts[0]}).then(response => {
            const data = response.data
            setToken(data.uid);
            // console.log(data.username);
            setUser(data.username);

        })
    };
    const getProfiles = () => {
        updateScore()
    }
    const disconnectWallet = () => {
        setAccount('');
        setUser('');
        setToken('');
    };
    const onLogin = () => {
        login({address: address}).then(response => {
            const data = response.data
            setToken(data.uid);
            updateScore(data.score);
            setUser(data.username);
        })
        console.log("login");
    }
    useEffect(() => {
        getProfiles();
        if(isConnected) {
            onLogin();
        } else {
            disconnectWallet();

        }
        const uid = getToken();
        // if(uid != undefined && uid!= '') {
        //     setAccount('account')
        // }
    }, [isConnected])

    return (
        <div >
            { isConnected?
            <div className="create-container">
                <button className="button-new"> Score: {score}</button>
                {/*</Link>*/}
            </div> : <div />
            }
            <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                }}
            />

            {/*    <button className="connect-wallet-btn connect-wallet-bg" onClick={connectWallet}>*/}
            {/*         <div className="connect-wallet-connect">*/}
            {/*             Connect Wallet*/}
            {/*        </div>*/}
            {/*    </button>*/}
            {/*    <div>*/}
            {/*        <div className="disconnect-button">*/}
            {/*            Wallet connected: {user}*/}
            {/*            <div  onClick={disconnectWallet}>Your Scores:{score}</div>*/}
            {/*        </div>*/}
            {/*        <div className="create-container" onClick={() => {*/}
            {/*            navigate('/create')*/}
            {/*            getProfiles()*/}
            {/*        }}>*/}
            {/*            /!*<Link to={"create"}>*!/*/}
            {/*            <Addfill className="addicon" />*/}
            {/*            <button className="button-new"> Create</button>*/}
            {/*            /!*</Link>*!/*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default ConnectWallet;