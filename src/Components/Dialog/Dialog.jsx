import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const DialogBox = (props) => {

    return (
        
        <Dialog open={props.openDialog} maxWidth={props.maxWidth}>
            <DialogTitle>
                <div className="modal-title-wrap flex justify-space-between align-center">
                    <div className="modal-title">Add Contact</div>
                    <button className="btn btn-dialog-close" onClick={() => props.setOpenDialog(false)}>X</button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}

export default DialogBox