import React from 'react'
import firebase from '../../firebase/firebase'

const ContactListItem = (props) => {

    const ref =  firebase.firestore().collection("contacts")

    const onDeleteHandler = () => {
        ref.doc(props.id).delete();
    }

    return (
        <tr>
            <td data-scope="row">{props.firstName} {props.lastName}</td>
            <td data-title="Email">{props.email}</td>
            <td data-title="Phone">{props.phone}
                <div className="action-buttons">
                    <button className="btn light edit-btn action-btn" onClick={() => props.contactForEdit(props.contact)}><i className="far fa-edit"></i></button>
                    <button className="btn light delete-btn action-btn" onClick={onDeleteHandler}><i className="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>
    )
}

export default ContactListItem