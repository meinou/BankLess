import React from 'react';
import {Link} from 'react-router-dom';

import Wallet from '../assets/wallet-flat.png';
import '../style/initializer.css';

const Initializer = (props) => {
    return (
        <div className="row no-gutters">
            <div className="col col-sm-12 createWalleField">
                <figure className="row no-gutters">
                    <div className="col col-sm-12 wallet">
                        <img src={Wallet} alt="wallet"/>
                    </div>
                </figure>
                <Link to='/home'><button className="btn btn-success" onClick={props.handleCreateWallet}>Create a wallet</button></Link>
            </div>
        </div>
    )
};

export default Initializer;