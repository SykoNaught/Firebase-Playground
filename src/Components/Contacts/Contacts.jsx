import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import ContactComponent from './ContactListItem'
import DialogBox from '../Dialog/Dialog'
import ContactForm from './ContactForm'

      

const Contacts = () => {
    
    const [contacts, setContacts] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
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
    const getContactById = (contact) => {
        
    }
    
    useEffect(() => {
        getContacts()
    }, [])

    function search(contacts) {
        let query = searchValue.toLowerCase()
        return contacts.filter(
            (contact) =>
            contact.firstName.toLowerCase().indexOf(query) > -1 ||
            contact.lastName.toLowerCase().indexOf(query) > -1 ||
            contact.email.toLowerCase().indexOf(query) > -1 ||
            contact.phone.toLowerCase().indexOf(query) > -1 
        )
    }

    let contactList = (
        <tbody>
            {search(contacts).map((contact, i) => {
               return <ContactComponent
                firstName={contact.firstName}
                lastName={contact.lastName}
                email={contact.email}
                phone={contact.phone}
                id={contact.id}
                editClick={setOpenDialog}
                contact={contact}
                contactForEdit={getContactById}
                key={i} />
            })}
        </tbody>
    )
    
    return (
        
        <div className="flex-contain">       
            <Sidebar />
            <div className="body-section">
                <Header PageName="Contacts"  />
                
                <div className="body-content">
                    <div className="contacts-input section flex justify-space-between align-center">   
                        <input type="text" name="First Name" className="form-field" placeholder="Search Contacts" value={searchValue} autoComplete="off" onChange={e => setSearchValue(e.currentTarget.value)} />
                        <button className="btn btn-primary pull-right" onClick={(e) => {e.currentTarget.blur(); setOpenDialog(true)}} >Add Contact</button>
                    </div>
                    <div className="contacts-wrapper">
                        <table className="table section">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            {contactList}
                        </table>
                    </div>
                
                </div>
                <DialogBox
                    openDialog = {openDialog}
                    setOpenDialog = {setOpenDialog}
                    maxWidth='md'>
                    <ContactForm
                    setOpenDialog={setOpenDialog} />
                </DialogBox>
            </div>
        </div>
    )
}

export default Contacts