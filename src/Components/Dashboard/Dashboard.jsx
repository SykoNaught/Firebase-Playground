import React from 'react';
import Sidebar from '../Layout/Sidebar'
import Header from '../Layout/Header'
import { Grid } from '@material-ui/core';
import ContactCount from './DashboardWidgets/ContactCount'


const Dashboard = (props) => {
    return (
        <div className='flex-contain'>       
            <Sidebar collapseToggle={props.collapseToggle} />
            <div className="body-section">
                <Header PageName="Dashboard" />
                
                <div className="body-content">
                <Grid container spacing={2} justify="space-between">
                    <Grid container item lg={3} sm={4} xs={6}>
                        <ContactCount />
                    </Grid>
                </Grid>
                </div>
            </div>
        </div>
    )
}

export default Dashboard