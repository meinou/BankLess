import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import StellarSdk from 'stellar-sdk';
import axios from 'axios';
import request from 'request';

import BasicPage from './components/BasicPage';
import Balance from './components/Balance';
import BottomMenu from './components/BottomMenu';
import PaymentForm from './components/PaymentForm';
import Transaction from './components/Transaction';
import Initializer from './components/Initializer';

import {Portions} from "./storage/Portions";
import {Transactions} from './storage/Transactions'; 

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      simpleBalance: null,
      balance: [{XLM: [0, 0], exch: 0.54}, {ETH: [0, 0], exch: 200.54}, {BTC: [0, 0], exch: 54.78}],
      dataGraphs: [],
      botomMenuList: ["Home", "Pay", "Portion", "Storage"],
      valuePubKey: "",
      valueCurrency: "",
      valuePortion: "",
      valueAmount: "",
    }
    this.handleFillForm = this.handleFillForm.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleCreateWallet = this.handleCreateWallet.bind(this);
    this.createWallet = this.createWallet.bind(this);
    this.checkBalance = this.checkBalance.bind(this);
  };

  componentWillMount() {
    let obj = [...this.state.balance]
    Transactions.map(elem => {
      switch(elem.currency) {
        case "XLM": obj[0]["XLM"][0] += elem.amount;
        break;
        case "ETH": obj[1]["ETH"][0] += elem.amount;
        break;
        case "BTC": obj[2]["BTC"][0] += elem.amount;
        break;
      }
    });
    console.log(this.state.balance);
    obj[0]["XLM"][1] = Math.ceil(obj[0]["XLM"][0] * obj[0]["exch"]);
    obj[1]["ETH"][1] = Math.ceil(obj[1]["ETH"][0] * obj[1]["exch"]);
    obj[2]["BTC"][1] = Math.ceil(obj[2]["BTC"][0] * obj[2]["exch"]);
  };

  handleFillForm(e) {
    e.preventDefault();
    switch(e.target.name) {
      case "pubKey": 
        this.setState({
          valuePubKey: e.target.value
        })
      break;
      case "amount": 
        this.setState({
          valueAmount: e.target.value
        })
      break;
      case "currency": 
        this.setState({
          valueCurrency: e.target.value
        })
      break;
      case "portion": 
        this.setState({
          valuePortion: e.target.value
        })
      break;
      default: 0;
    }
  };

  handleSubmitForm(e) {
    e.preventDefault();
    e.stopPropagation();
  };

  createWallet(Keypair) {
    request.get({
      url: "https://friendbot.stellar.org",
      qs: { addr: Keypair.publicKey() },
      json: true
    },((error, response, body) => {
      error || response.statusCode !== 200 
      ? 
      console.error("something went wrong", body || error) 
      : 
      console.log("WALLET CREATED SUCCESSFULLY! \n", body )
      })
    )
  };

  checkBalance(secret) {
    var pair = StellarSdk.Keypair.fromSecret(secret);
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    server.loadAccount(pair.publicKey()).then(account => {
      console.log('Balances for account: ' + pair.publicKey());
      account.balances.forEach(balance => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
        this.setState({
          simpleBalance: balance.balance
        })
      });
    });
  };

  async handleCreateWallet  (e)  {
    try {
      if (process.env.REACT_APP_SECRET !== undefined) {
      const balance = await this.checkBalance(process.env.REACT_APP_SECRET)
      } else {
      const keyPair = await StellarSdk.Keypair.random()
      const newWallet = await this.createWallet(keyPair)
      }
    }catch(err) {
      console.log(err);
    };
  };

  render() {
    return (
      <div className="container App">       
        <div className="row no-gutters">
          <div className="col col-sm-12">
            <Balance balance={this.state.balance}/>
            <Switch>
              <Route exact path="/" 
                render={(props) => (
                  <Initializer 
                    handleCreateWallet={this.handleCreateWallet}
                  />
                )} 
              />  
              <Route exact path="/home"  
                render={props => (
                  <BasicPage 
                    dataGraphs={this.state.dataGraphs}
                  />
                )}
              />
              <Route exact path="/pay"
                render={props => (
                  <PaymentForm
                    portions={Portions}
                    value={this.state.valueForm}
                    handleFillForm={this.handleFillForm}
                    handleSubmitForm={this.handleSubmitForm}
                  />
              )}
              />
              <Route exact path="/transaction"
                render={props => (
                  <Transaction
                    valueAmount={this.state.valueAmount}
                    valuePubKey={this.state.valuePubKey}
                    valueCurrency={this.state.valueCurrency}
                    valuePortion={this.state.valuePortion}
                    simpleBalance={this.state.simpleBalance}
                    checkBalance={this.checkBalance}
                  />  
                )}
                />
            </Switch>
            <BottomMenu botomMenuList={this.state.botomMenuList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
