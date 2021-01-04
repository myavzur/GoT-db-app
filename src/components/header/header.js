import React from 'react';
import './header.css'

import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="header-block">
            <h3 className="header-title">
                <Link to="/characters" className="nav-link nav-title">Game of Thrones Database</Link>
            </h3>

            <ul className="header-links"> 
                <li>
                    <Link to="/characters" className="nav-link">Characters</Link>
                </li>
                <li>
                    <Link to="/books" className="nav-link">Books</Link>  
                </li>
                <li>
                    <Link to="/houses" className="nav-link">Houses</Link>    
                </li>
            </ul>
        </div>
    );
};

export default Header;