import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase/firebase'

const ContactsCountWidget = () => {
    
    const [contacts, setContacts] = useState([])
    const ref = firebase.firestore().collection("contacts")
    
    function getContacts() {
        ref.onSnapshot((querySnapShot) => {
            const items = []
            querySnapShot.forEach((doc) => {
                items.push({...doc.data(), id: doc.id})
            })
            setContacts(items)
        })
    }
    
    useEffect(() => {
        getContacts()
    }, [])
    
    
    return (
        <div className="dashboard-widget section widget-section">       
            <div className="widget-value text-center">
                {contacts.length}
            </div>
            <div className="widget-title widget-footer text-center">
                Number of Contacts
            </div>
        </div>
    )
}

export default ContactsCountWidget