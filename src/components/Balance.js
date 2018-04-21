import React from 'react';

import '../style/balance.css';

const Balance = (props) => {
    return (
        <div className="row no-gutters justify-content-center Balance">
             <div className="col col-sm-12">
             <div className="row">
                <div className="col col-sm-12 lineBalance">
                    <p>BALANCE</p>
                </div>
             </div>
                <div className="row no-gutters">
                {
                    props.balance.map((elem, i) => {
                        const nameOfClass = `col col-sm-${12 / props.balance.length} assetsName`;
                        return (
                            <div id={Object.keys(elem)[0]} className={nameOfClass} key={i}>
                                {Object.keys(elem)[0]}
                            </div>
                        )
                    })
                }
                </div>
                <div className="row no-gutters">
                {
                    props.balance.map((elem, i) => {
                        const nameOfClass = `col col-sm-${12 / props.balance.length} valueInAssets`;
                        return (
                            <div className={nameOfClass} key= {i*2}>
                                {Object.values(elem)[0].join(" / ")} 
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    );
};

export default Balance;