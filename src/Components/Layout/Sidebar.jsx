import React from 'react';
import { Link } from 'react-router-dom'
import Logo from'../../Assets/Images/logo-new.png';

const Sidebar = () => {

    return (
        <header id="sidebar">
            <div className="logo flex align-center">
                {/* <img src={Logo} className="img-responsive" alt="Logo" /> Enthrall */}
                Logo
            </div>
            <nav>
                <ul className="sidebar-nav">
                    <Link  to='/'>
                        <li>Dashboard</li>
                    </Link>
                    <Link to='/contacts'>
                        <li>Contacts</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Sidebar