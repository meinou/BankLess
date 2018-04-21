import React from 'react';
import {Link} from "react-router-dom";

import '../style/paymentForm.css';

const PaymentForm = (props) => {
    return (
        <div className="row no-gutters paymentForm">
            <div className="col col-sm-12 paymentForm">
            <header><h4>PAYMENT FORM</h4></header>
                <form onSubmit={props.handleSubmitForm}>
                    <div className="form-group col col-sm-12 label">
                        <label>Public key</label>
                        <input 
                            className="form-control"
                            aria-describedby="pubKeyField"
                            id="pubKey"
                            type="text"
                            name="pubKey"
                            placeholder="public key"
                            value={props.value}
                            onChange={props.handleFillForm}
                        />
                         <small id="pubKeyField" className="form-text text-muted">public key is always safe to share</small>
                    </div>
                    <div className="form-row col-sm-12 amountAndCurrency">
                        <div className="form-group col-sm-8 amount">
                            <label>Amount</label>
                            <input 
                                className="form-control"
                                id="amount"
                                type="text"
                                name="amount"
                                placeholder="amount"
                                value={props.value}
                                onChange={props.handleFillForm}
                            />
                        </div>
                        <div className="form-group col-sm-4 currency">
                            <label >Currency</label>
                            <select 
                                className="form-control"
                                id="currency"
                                type="text"
                                name="currency"
                                placeholder="amount"
                                value={props.value}
                                onChange={props.handleFillForm}
                            >
                                <option>Choose...</option>
                                <option>XLM</option>
                                <option>ETH</option>
                                <option>BTC</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-12 portion">
                            <label >Portion</label>
                            <select 
                                className="form-control"
                                id="portion"
                                type="text"
                                name="portion"
                                placeholder="portion"
                                value={props.value}
                                onChange={props.handleFillForm}
                            >
                                <option>Choose...</option>
                            {
                                props.portions.map((elem, i) => {
                                    return <option key={i*6}>{elem.name}</option>
                                })
                            }
                            </select>
                        </div>
                        <div className="form-group col-sm-12 send">
                            {/* <button className="btn btn-primary" type="submit">SEND</button> */}
                            <Link to="/transaction"><button className="btn btn-primary" type="submit">SEND</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default PaymentForm;