import React, { Component } from 'react';
import {Portions} from "../storage/Portions";
import {Transactions} from '../storage/Transactions';

import Graph from './Graph';
import PortionList from './PortionsList';
import TransactionsList from './TransactionsList';

import '../style/basicPage.css';

class BasicPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            portions: Portions,
            transactions: Transactions
        }
    };

render() {
    return(
        <div className="row no-gutters">
            <div className="col col-sm-12 basicPage"> 
                <section className="row no-gutters middleSection"> 
                    <Graph />
                    <PortionList portions={this.state.portions}/>
                </section>
                <TransactionsList transactions={this.state.transactions} />
            </div>
        </div>
        )
    }
};

export default BasicPage;