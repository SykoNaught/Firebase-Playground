import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom'

      

const Breadcrumbs = () => {

    return (
        <div className="breadcrumbs">
            <Link to='/'>Home</Link>  
             / Dashboard
        </div>
    )
}

export default Breadcrumbs