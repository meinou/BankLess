import React from 'react';
import graph from '../assets/graphs.png';
import '../style/graph.css';
import {PieChart} from 'react-easy-chart';
import { PortionList } from '../components/PortionsList'



const Graph = (props) => {
    const dat = [];

    props.portions.map((elem, i) => {
        const porID = `${Object.keys(elem)[0]}`;
        return dat.push({key: elem.name, value: elem.balance})
     });
     console.log('data', dat);

    return (
        <div className="col col-xm-8 graphs"> 
            <div>
                <h3>Your finance</h3>
            </div>
            <PieChart size={170} data={dat} />
                          
        </div>
    );

};

export default Graph;


