import React from 'react';
import { NavLink } from 'react-router-dom'
import Logo from'../../Assets/Images/logo-new.png';

const Sidebar = (props) => {
    
    return (
        <header id="sidebar">
            <div className="sidebar-head">
                <div className="logo flex align-center fill-height">
                    {/* <img src={Logo} className="img-responsive sidebar-icon flex align-center" alt="Logo" />
                    <span className="sidebar-name flex align-center">Enthrall</span> */}
                    Logo
                </div>
            </div>
            <div className="sidebar-body fill-height">
                <nav id="nav">
                    <ul className="sidebar-nav">
                        <li>
                            <NavLink exact={true} activeClassName='is-active' to='/'>
                                <span className="sidebar-icon"><i className="fas fa-th-large"></i></span>
                                <span className="sidebar-name">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName='is-active' to='/contacts'>
                                <span className="sidebar-icon"><i className="fas fa-address-card"></i></span>
                                <span className="sidebar-name">Contacts</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="collapse-sidebar" onClick={props.collapseToggle}>
                <span></span>
            </div>
        </header>
    )
}

export default Sidebar