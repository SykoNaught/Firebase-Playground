import React, { useState, useEffect } from 'react';
import firebase from '../../firebase/firebase'
import Header from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import ContactListItem from './ContactListItem'
import DialogBox from '../Dialog/Dialog'
import ManageContactsForm from './ManageContactsForm'

      

const Contacts = (props) => {
    
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

    const search =  contacts.filter(
        contact => 
            contact.firstName.toLowerCase().indexOf(searchValue) > -1 ||
            contact.lastName.toLowerCase().indexOf(searchValue) > -1 ||
            contact.email.toLowerCase().indexOf(searchValue) > -1 ||
            contact.phone.toLowerCase().indexOf(searchValue) > -1 
    )
    

    let contactList = (
        search.map((contact, i) => {
            return <ContactListItem
                firstName={contact.firstName}
                lastName={contact.lastName}
                email={contact.email}
                phone={contact.phone}
                id={contact.id}
                editClick={setOpenDialog}
                contact={contact}
                contactForEdit={getContactById}
                key={contact.id} />
        })
    )
    
    return (
        
        <div className="flex-contain">       
            <Sidebar collapseToggle={props.collapseToggle} />
            <div className="body-section">
                <Header PageName="Contacts"  />
                
                <div className="body-content">
                    <div className="contacts-input flex justify-space-between align-center">   
                        <div className="search-icon">
                            <i className="fas fa-search"></i>
                        </div>
                        <input type="text" name="Search" className="form-field" id="search-contacts" placeholder="Search Contacts" value={searchValue} autoComplete="off" onChange={e => setSearchValue(e.currentTarget.value.toLowerCase())} />
                        <button className="btn btn-primary light pull-right" onClick={(e) => {e.currentTarget.blur(); setOpenDialog(true)}} >Add Contact</button>
                    </div>
                    <div className="contacts-wrapper">
                        <table className="table responsive-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    search.length > 0 ? (contactList):(
                                        <tr>
                                            <td className="no-results" colSpan="3">
                                            {
                                                contacts.length > 0 ? (
                                                    <span>No results for {searchValue}</span>
                                                ):(
                                                    <span>You currently have no contacts</span>
                                                )
                                            }           
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                
                </div>
                <DialogBox
                    openDialog = {openDialog}
                    setOpenDialog = {setOpenDialog}
                    maxWidth='md'>
                    <ManageContactsForm
                        setOpenDialog={setOpenDialog} />
                </DialogBox>
            </div>
        </div>
    )
}

export default Contacts