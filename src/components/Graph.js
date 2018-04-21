import React from 'react';
import graph from '../assets/graphs.png';
import '../style/graph.css';



const Graph = (props) => {
    return (
        <div className="col col-xm-8 graphs"> 
            <img src={graph} alt="graph" />
        </div>
    );
};

export default Graph;