import React from 'react';
import Sidebar from './Sidebar'
import Header from './header'


const Dashboard = () => {
    
    

    return (
        <div className="flex-contain">       
            <Sidebar />
            <div className="body-section">
                <Header PageName="Dashboard" />
                
                <div className="body-content">
                    
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard