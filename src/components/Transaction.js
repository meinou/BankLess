import React, { Component } from 'react';
import StellarSdk from 'stellar-sdk';
import ReactLoading from 'react-loading';

import '../style/transaction.css';

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state={
            transactionResult: null
        }
        this.makePayment = this.makePayment.bind(this);
    };

    componentWillMount() {
        this.makePayment();
    }
    
    componentWillReceiveProps(nextProps) {
    };

    makePayment() {
        let self = this;
        StellarSdk.Network.useTestNetwork();
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        var sourceKeys = StellarSdk.Keypair.fromSecret(`${process.env.REACT_APP_SECRET}`);
        var destinationId = this.props.valuePubKey;
        var transaction;
        var amount = this.props.valueAmount;
        
        server.loadAccount(destinationId)
        .catch(StellarSdk.NotFoundError, function (error) {
        throw new Error('The destination account does not exist!');
        })
        .then(function() {
        return server.loadAccount(sourceKeys.publicKey());
        })
        .then(function(sourceAccount) {
        transaction = new StellarSdk.TransactionBuilder(sourceAccount)
        .addOperation(StellarSdk.Operation.payment({
            destination: destinationId,
            asset: StellarSdk.Asset.native(),
            amount: amount
        }))
        .addMemo(StellarSdk.Memo.text('Buy a ticket to attractions'))
        .build();
        transaction.sign(sourceKeys);
        return server.submitTransaction(transaction);
        })
        .then(function(result) {
        console.log('Success! Results:', result);
        self.setState({
            transactionResult: true
            })
        })
        .then(() => {
            self.props.checkBalance(sourceKeys.secret());
        })
        .catch(function(error) {
        console.error('Something went wrong!', error);
        // server.submitTransaction(transaction);
        self.setState({
            transactionResult: false
        });
        })
    };

    render() {
        let color = "black";
        let type = "spinningBubbles";
        return this.state.transactionResult === null 
        ?
        <div className="row no-gutters">
            <div className="col col-sm-12 loading" style={{padding: "10rem 7rem"}}>
                <ReactLoading type={type} color={color} height={150} width={150} />
            </div>
        </div>
        :
        <div className="row no-gutters">
            <div className="col col-sm-12 loaded">
                <div className="row no-gutters">
                    <div className="col col-sm-12 transHeader">
                        <h4>TRANSACTION SUCCESSFUL!</h4>
                    </div>
                </div>
                <div className="row no-gutters"> 
                    <div className="col col-sm-12 transBody">
                        <h5>Recepient: <span>{this.props.valuePubKey}</span></h5>
                        <h5>Amount: {this.props.valueAmount} <span>{this.props.valueCurrency}</span></h5>
                        <h5>Portion: {this.props.valuePortion}</h5>
                        <h5>Balance: {this.props.simpleBalance}</h5>
                    </div>
                </div>
            </div>
        </div>
    }
};

export default Transaction;