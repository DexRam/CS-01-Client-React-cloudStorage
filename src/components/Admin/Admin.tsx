import { FC, useEffect, useState } from 'react';
import { getUsers, toggleUserRole, deleteUser } from '../../API/User';
import { User } from '../User/interfaces';
import UserCard from '../User/UserCard';
import { ContentContainer, CardContainer, FormContainer, ActionContainer } from "../UIComponents/Containers";
import { CardHeader } from "../UIComponents/Cards";
import { InputField } from "../UIComponents/InputFields";
import { ActionSubmit } from "../UIComponents/Actions";
import { ActionButton } from "../UIComponents/Actions";
import { Modal } from "../UIComponents/Modals";
import { useRegisterForm } from "../Register/useRegisterForm";

const Admin: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const usersData = await getUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = async (userId: number) => {
    await toggleUserRole(userId);
    fetchUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId)
    fetchUsers();
  };

  const handleManageUserFiles = (userId: number) => {
    console.log(`Manage user files: ${userId}`)
    fetchUsers();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
    fetchUsers();
  };

  const {
    state: { username, fullname: fullname, email, password, errors, isFormValid },
    passwordVisible,
    setPasswordVisible,
    handleFieldChange,
    handleSubmit
  } = useRegisterForm();

  const inputFieldProps = [
    { label: "Username", type: "text", value: username, onChange: handleFieldChange("username"), error: errors.username },
    { label: "Fullname", type: "text", value: fullname, onChange: handleFieldChange("fullname"), error: errors.fullname },
    { label: "Email", type: "text", value: email, onChange: handleFieldChange("email"), error: errors.email },
    { label: "Password", type: "password", value: password, onChange: handleFieldChange("password"), error: errors.password, passwordVisible, setPasswordVisible }
  ];

  return (
    <div className={`${isModalOpen ? "opacity-75" : ""}`}>
      <ContentContainer>
        <ActionContainer>
          <ActionButton
            onClick={toggleModal}
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
            onToggleUserRole={toggleRole}
            onManageUserFiles={handleManageUserFiles}
          />
        ))}
        {isModalOpen && (
          <Modal>
            <div className="max-w-96">
              <CardContainer>
                <CardHeader title="Add User" />
                <FormContainer handleSubmit={(event) => handleSubmit(event, false)}>
                  {inputFieldProps.map((props, index) => (
                    <InputField key={index} {...props} />
                  ))}
                  <div className='flex justify-between'>
                    <ActionButton
                      onClick={() => toggleModal()}
                      color="bg-red-500"
                      hoverColor="bg-red-600"
                    >
                      Close
                    </ActionButton>
                    <ActionSubmit
                      isFormValid={isFormValid}
                      color="bg-blue-500"
                      hoverColor="bg-blue-600"
                    >
                      Submit
                    </ActionSubmit>
                  </div>
                </FormContainer>
              </CardContainer>
            </div>
          </Modal>
        )}
      </ContentContainer>
    </div>
  );
};

export default Admin;
