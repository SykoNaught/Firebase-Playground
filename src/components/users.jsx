import React, { useState, useEffect } from 'react';
import firebase from '../firebase/firebase'
import Header from '../components/header'
import Sidebar from './Sidebar'
      

const UserList = () => {
    
    const [users, setUsers] = useState([])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
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

    function onSubmit(e) {
        e.preventDefault()
        ref.add({
            firstName,
            lastName
        }).then(() => {
            setFirstName('')
            setLastName('')
        })
    }
    
    useEffect(() => {
        getUsers()
    }, [])

    return (
        
        <div className="flex-contain">       
            <Sidebar />
            <div className="body-section">
                <Header PageName="Users" />
                
                <div className="body-content">
                    
                    <div className="users-input section">
                        <h2>Add Users</h2>
                        <form className="users-form" onSubmit={onSubmit}>
                            <input type="text" className="form-field" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} />
                            <input type="text" className="form-field" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.currentTarget.value)} />
                            <button type="submit" className="form-field" >Submit</button>
                        </form>
                    </div>
                    <div className="users-wrapper">
                        <table className="table section">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
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