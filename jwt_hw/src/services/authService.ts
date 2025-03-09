import bcrypt from 'bcrypt';

const passwordHash = bcrypt.hashSync('password123', 10);

export const mockUser = {
  id: 1,
  username: 'testuser',
  passwordHash,
};
