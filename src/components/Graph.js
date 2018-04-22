import React from 'react';
import graph from '../assets/graphs.png';
import '../style/graph.css';
import {PieChart} from 'react-easy-chart';
import { PortionList } from '../components/PortionsList';
import {Legend} from 'react-easy-chart';


const Graph = (props) => {
    const dat = [];
    console.log('data', props);
    props.portions.map((elem, i) => {
        const porID = `${Object.keys(elem)[0]}`;
        return dat.push({key: elem.name, value: elem.balance})
     });

    return (
        <div className="col col-xm-8 graphs"> 
            <div>
                <h3></h3>
            </div>
            <PieChart 
                  size={170} 
                  innerHoleSize={70}
                  data={dat} />
            <Legend data={dat} dataId={'key'} horizontal/>
                          
        </div>
    );

};

export default Graph;


