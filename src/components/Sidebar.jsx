import React from 'react';
import '../index.css'
import { Link } from 'react-router-dom'

      

const Header = () => {

    return (
        <header id="sidebar">
            <div className="logo">
                LOGO
            </div>
            <nav>
                <ul className="sidebar-nav">
                    <Link to='/'>
                        <li>Dashboard</li>
                    </Link>
                    <Link to='/users'>
                        <li>Users</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header