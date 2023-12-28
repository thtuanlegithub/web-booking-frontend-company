import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ open, onClose, onConfirm, title, content }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button className='!bg-red-300 hover:!bg-red-700 !normal-case !font-semibold !text-white' onClick={onClose} color="primary">
                    No
                </Button>
                <Button className='!bg-green-300 hover:!bg-green-700 !normal-case !font-semibold !text-white' onClick={onConfirm} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
