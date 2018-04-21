import React from 'react';
import {Link} from 'react-router-dom';

import '../style/bottomMenu.css';

const BottomMenu = (props) => {
    return (
        <footer className="row no-gutters align-items-center bottomMenu">
            {
               props.botomMenuList.map((elem, i) => {
                    const nameOfClass = `col col-sm-${12 / props.botomMenuList.length} bottomButton`;
                    const path=`/${elem}`
                    return (
                        <div className={nameOfClass} key={i*3}>
                            <Link to={path}>
                                <button className="btn btn-light" style={{width: "100%", height: "100%"}}>
                                    <p>{elem}</p>
                                </button>
                            </Link>
                        </div>

                    )
                })
            }
        </footer>
    )
};

export default BottomMenu;