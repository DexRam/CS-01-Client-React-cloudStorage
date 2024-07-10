import { FC, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar';
import { getUsers } from '../../API/User';
import { deleteUser, addUser } from '../User/UserHandling';
import {
  handleDownload,
  handleRename,
  handleDelete,
  handleShare,
} from "../File/FileHandling";
import { User } from '../User/interfaces';
import UserCard from '../User/UserCard';
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";
// import { Users, files } from '../Additional/devData';

const Admin: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);


  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  // const getUserFiles = (userId: number) => files.filter((file) => file.fileOwner === userId);

  const toggleUserRole = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId
          ? {
            ...user,
            userRole: user.userRole === 'admin' ? 'user' : 'admin',
          }
          : user
      )
    );
  };

  const handleAddUser = () => {
    addUser();
  };

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
  };

  return (
    <ContentContainer>
      <SearchBar />
      <ActionContainer>
        <ActionButton
          onClick={handleAddUser}
          color="bg-green-500"
          hoverColor="bg-green-600"
        >
          Add User
        </ActionButton>
      </ActionContainer>
      {users.map((user) => (
        <UserCard
          key={user.userId}
          user={user}
          isSelected={selectedUserId === user.userId}
          onUserClick={handleUserClick}
          onDeleteUser={handleDeleteUser}
          onToggleUserRole={toggleUserRole}
          files={"There will be files"}
          onDownload={handleDownload}
          onRename={handleRename}
          onDelete={handleDelete}
          onShare={handleShare}
          showCheckbox={false}
        />
      ))}
    </ContentContainer>
  );
};

export default Admin;
