import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase'
import Sidebar from './Sidebar'
import Header from './header'


const Dashboard = () => {
    
    

    return (
        <div className="flex-contain">       
            <Sidebar />
            <div class="body-section">
                <Header />
                
                <div class="body-content">
                    <h1>Dashboard</h1>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard