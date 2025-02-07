import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateUserProfile } from '../slices/userSlice';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const EditProfileForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(user.avatar);
    const [group, setGroup] = useState(user.group);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
        setGroup(user.group);
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUserProfile({ name, email, avatar, group }));
        onClose();
    };

    return (
        <FormContainer component="form" onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="URL аватара"
                name="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                fullWidth
            />
            <TextField
                label="Группа"
                name="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Сохранить
            </Button>
        </FormContainer>
    );
};

export default EditProfileForm;