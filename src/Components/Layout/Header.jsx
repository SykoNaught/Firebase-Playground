import React, { useContext } from 'react';
import firebase from '../../firebase/firebase'
import { AuthContext } from '../../Auth'



const Header = (props) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="header-wrap">
            <header id="header">
                <div className="page-title">
                    <h1>{props.PageName}</h1>
                </div>
                <div className="user-actions flex justify-center align-center fill-height">
                    <div className="user-icon flex justify-center align-center">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="user-name">
                        {currentUser.email}
                    </div>
                    <div className="user-dropdown">
                        <button className="sign-out" onClick={() => firebase.auth().signOut()}>
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                </div>
            </header>  
        </div>
        
    )
}

export default Header