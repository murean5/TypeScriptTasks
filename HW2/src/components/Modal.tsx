import React, { ReactNode } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className={styles.modal}>
            <button onClick={onClose}>Закрыть</button>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
