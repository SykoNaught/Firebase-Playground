import React from 'react'
import firebase from '../../firebase/firebase'

const ContactListItem = (props) => {

    const ref =  firebase.firestore().collection("contacts")

    const onDeleteHandler = () => {
        ref.doc(props.id).delete();
    }

    return (
        <tr>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phone}
                <div className="action-buttons">
                    <button className="btn edit-btn action-btn" onClick={() => props.contactForEdit(props.contact)}><i className="far fa-edit"></i></button>
                    <button className="btn delete-btn action-btn" onClick={onDeleteHandler}><i className="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>
    )
}

export default ContactListItem