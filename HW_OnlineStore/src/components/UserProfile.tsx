import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Typography, Button, Box, Modal, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import EditProfileForm from './EditProfileForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '64px',
    gap: '20px',
});

const TitleContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
    marginBottom: '20px',
});

const UserProfile: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleEditProfile = () => {
        setEditModalOpen(true);
    };

    const handleEditProfileClose = () => {
        setEditModalOpen(false);
    };

    return (
        <ProfileContainer>
            <TitleContainer>
                <IconButton onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">Профиль пользователя</Typography>
            </TitleContainer>
            <Avatar src={user.avatar} alt={user.name} sx={{ width: 100, height: 100 }} />
            <Typography><strong>Имя:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Группа:</strong> {user.group}</Typography>
            <Button variant="contained" color="primary" onClick={handleEditProfile}>Изменить</Button>
            <Modal open={editModalOpen} onClose={handleEditProfileClose}>
                <Box>
                    <EditProfileForm onClose={handleEditProfileClose} />
                </Box>
            </Modal>
        </ProfileContainer>
    );
};

export default UserProfile;