import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUsers } from '../features/users/selectors';

export const UserList: React.FC = () => {
    const users = useSelector(selectUsers);

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>
    );
};
