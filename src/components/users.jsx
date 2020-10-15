import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase'
import Header from '../components/header'
import Sidebar from './Sidebar'
      

const UserList = () => {
    
    const [users, setUsers] = useState([])
    const ref = firebase.firestore().collection("users")

    function getUsers() {
        ref.onSnapshot((querySnapShot) => {
            const items = []
            querySnapShot.forEach((doc) => {
                items.push(doc.data())
            })
            setUsers(items)
        }) 
    }
    
    useEffect(() => {
        getUsers()
    }, [])

    return (
        
        <div className="flex-contain">       
            <Sidebar />
            <div class="body-section">
                <Header />
                
                <div class="body-content">
                    <div class="users-wrapper">
                        <h2>Users</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                
                </div>
                
            </div>
        </div>
    )
}

export default UserList