import React from 'react';
import {Link} from 'react-router-dom';
import './nullPage.css'

function NullPage() {
    return (
        <div className='null-page rounded'>
            <h1>404</h1>
            <p>There is no page that are you looking for</p>
            <Link to="/characters" className='btn btn-primary'>Return to our galaxy</Link>
        </div>
    )
}

export default NullPage;