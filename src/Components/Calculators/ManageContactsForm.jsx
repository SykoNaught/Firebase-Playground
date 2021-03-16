import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import firebase from '../../firebase/firebase'

const ManageContactsForm = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const ref = firebase.firestore().collection("contacts")

    const addOrEditHandler = e => {
        e.preventDefault()
        ref.add({
            firstName,
            lastName
        }).then(() => {
            resetForm()
            props.setOpenDialog(false)
        })
    }
    const resetForm = () => {
        setFirstName('')
        setLastName('')
    }

    return (
        <form className="contacts-form" onSubmit={addOrEditHandler}>
            <Grid container spacing={2} justify="space-between">
                <Grid container item xs={3}>
                    <input type="text" name="First Name" className="form-field" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} required />
                </Grid>
                <Grid container item xs={9}>
                    <input type="text" name="Last Name" className="form-field" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.currentTarget.value)} required />
                </Grid>
                <Grid container item xs={12}>
                    <div className="modal-btn-wrap flex justify-end">
                        <button type="button" className="btn btn-secondary light pull-right" onClick={() => {resetForm(); props.setOpenDialog(false)}}>Cancel</button>
                        <button type="submit" className="btn btn-primary light pull-right" >Submit</button>
                    </div>
                </Grid>
            </Grid>
            
        </form>
    )
}

export default ManageContactsForm