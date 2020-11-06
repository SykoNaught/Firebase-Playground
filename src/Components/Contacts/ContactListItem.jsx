import React from 'react'
import firebase from '../../firebase/firebase'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const ContactListItem = (props) => {

    const ref =  firebase.firestore().collection("contacts")

    const onDeleteHandler = () => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to do delete this user?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => ref.doc(props.id).delete()
              },
              {
                label: 'Cancel'
              }
            ]
          });
        
    }

    return (
        <tr>
            <td data-scope="row">
              <div className="action-buttons show-mobile">
                  <button className="btn light edit-btn action-btn" onClick={() => props.contactForEdit(props.contact)}><i className="far fa-edit"></i></button>
                  <button className="btn light delete-btn action-btn" onClick={onDeleteHandler}><i className="far fa-trash-alt"></i></button>
              </div>
              {props.firstName} {props.lastName}
            </td>
            <td data-title="Email">{props.email}</td>
            <td data-title="Phone">{props.phone}
                <div className="action-buttons hide-mobile">
                    <button className="btn light edit-btn action-btn" onClick={() => props.contactForEdit(props.contact)}><i className="far fa-edit"></i></button>
                    <button className="btn light delete-btn action-btn" onClick={onDeleteHandler}><i className="far fa-trash-alt"></i></button>
                </div>
            </td>
        </tr>
    )
}

export default ContactListItem