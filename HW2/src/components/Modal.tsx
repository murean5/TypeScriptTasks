import React, { ReactNode } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/system';

type ModalProps = {
    onClose: () => void;
    open: boolean;
    title: string;
    children: ReactNode;
};

const CustomDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '16px',
    color: theme.palette.text.primary,
    overflowY: 'auto',
}));

const Modal: React.FC<ModalProps> = ({ onClose, open, title, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <CustomDialogContent dividers>
                {children}
            </CustomDialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Закрыть</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Modal;