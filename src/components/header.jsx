import React from 'react';
import '../index.css'
import firebase from '../firebase/firebase'
import Breadcrumbs from './Breadcrumbs'
      

const Header = (props) => {

    return (
        <div className="header-wrap">
            <header id="header">
                <div className="page-title">
                    <h1>{props.PageName}</h1>
                </div>
                <button className="sign-out" onClick={() => firebase.auth().signOut()}>
                    Sign Out
                </button>
            </header>
            <Breadcrumbs />
        </div>
        
    )
}

export default Header