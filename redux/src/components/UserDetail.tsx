import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserById } from '../features/users/selectors';
import { updateUserName } from '../features/users/usersSlice';

export const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const user = useSelector(selectUserById(Number(id)));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState(user?.name || '');

    const handleSave = () => {
        if (!name.trim()) {
            alert('Name cannot be empty');
            return;
        }
        dispatch(updateUserName({ id: Number(id), name }));
    };

    const handleBack = () => {
        navigate('/');
    };

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2>Edit User</h2>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={handleBack} className="back-button">Back</button>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

