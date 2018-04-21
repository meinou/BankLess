import React from 'react';

import '../style/portionsList.css';

const PortionList = (props) => {
    return (
        <aside className="col col-xm-4 portionList"> 
            {
               props.portions.map((elem, i) => {
                    const porID = `${Object.keys(elem)[0]}`;
                    return (
                        <div id={porID} className="portion" key={i*4}>
                            <button className="btn btn-light" style={{width: "95%"}}>
                                <h6>{elem.name}</h6>
                                <hr />
                                <p>{elem.balance} {elem.currency}</p>
                            </button>
                        </div>
                    )
                })
            }
        </aside>
    )
};
export default PortionList;