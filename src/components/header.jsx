import React from 'react';
import '../index.css'
import firebase from '../firebase/firebase'
import { Link } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'
      

const Header = () => {

    return (
        <div className="header-wrap">
            <header id="header">
                <button className="sign-out" onClick={() => firebase.auth().signOut()}>
                    Sign Out
                </button>
            </header>
            <Breadcrumbs />
        </div>
        
    )
}

export default Header