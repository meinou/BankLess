import React from 'react';
import {Link} from 'react-router-dom';

import '../style/transactionsList.css';
import UP from '../assets/up.png';
import DOWN from '../assets/down.png';

const TransactionsList = (props) => {
    let type = null;
    return (
        <section className="row no-gutters">
            <div className="col col-sm-12">
                <div className="row  no-gutters transactionHeader"> 
                    <div className="col col-sm-1 header" style={{maxWidth: "2rem"}}>
                        <span>Type</span>    
                    </div>
                    <div className="col col-sm-6 header" style={{maxWidth: "11.25rem"}}>
                        <span>PublicKey</span>    
                    </div>
                    <div className="col col-sm-2 header" style={{maxWidth: "5rem"}}>
                        <span>Portion</span>    
                    </div>
                    <div className="col col-sm-2 header" style={{maxWidth: "5rem", padding: "2% 0% 0%", lineHeight: "0.5rem"}}>
                        <span>Amount, asset</span>    
                    </div>
                </div>
                <div className="row no-gutters">
                    <div className="col col-sm-12 transactionsList">
                    {
                        props.transactions.map((elem, i) => {
                            const porID = `${Object.keys(elem)[0]}`;
                            let type, address, color = null;
                            elem.type == "debit" ? type = UP : type = DOWN;
                            i % 2 === 0 ? color="rgba(235,244,255,0.75)" : "white";
                            return (
                            <Link to="/transaction" key={i*5}>
                                <div className="row no-gutters transaction" style={{background: color}}>
                                    <div className="col col-sm-1 type" style={{maxWidth: "2rem"}}>
                                        <img src={type} alt="sign" style={{margin: " 1rem auto"}}/>
                                    </div>
                                    <div className="col col-sm-6">
                                        <h6 style={{fontSize: "10px", margin: " 1rem auto"}}>{elem.publicKey}</h6>
                                    </div>
                                    <div className="col col-sm-2">
                                        <h6 style={{fontSize: "12px", margin: " 1rem auto"}}>{elem.portion}</h6>
                                    </div>
                                    <div  className="col col-sm-3">
                                        <p>{elem.balance} <span>{elem.currency}</span></p>
                                    </div>
                                </div>
                            </Link>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </section>
    )
};

export default TransactionsList;


