import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase'
      

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
        <div>
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
            <button className="floating-text" onClick={() => firebase.auth().signOut()}>
                Sign Out
            </button>
        </div>
    )
}

export default UserList