import { FC, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar';
import { getUsers } from '../../API/User';
import { User } from '../User/interfaces';
import UserCard from '../User/UserCard';
import { ContentContainer, ActionContainer } from "../UIComponents/Containers";
import { ActionButton } from "../UIComponents/Actions";

const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData);
      console.log(usersData);
    };

    fetchUsers();
  }, []);


  const toggleUserRole = (userId: number) => {
    console.log(`User role toggled: ${userId}`)
  };

  const handleAddUser = () => {
    console.log("User added")
  };

  const handleDeleteUser = (userId: number) => {
    console.log(`User deleted: ${userId}`)
  };

  const handleManageUserFiles = (userId: number) => {
    console.log(`Manage user files: ${userId}`)
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
          key={user.id}
          user={user}
          onDeleteUser={handleDeleteUser}
          onToggleUserRole={toggleUserRole}
          onManageUserFiles={handleManageUserFiles}
        />
      ))}
    </ContentContainer>
  );
};

export default Admin;
