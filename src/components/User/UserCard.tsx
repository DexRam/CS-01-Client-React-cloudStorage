import { FC } from 'react';
import { CardContainer } from '../UIComponents/Containers';
import { CardHeader, CardBody } from '../UIComponents/Cards';
import { ActionButton } from '../UIComponents/Actions';
import { UserCardProps } from './interfaces';

const UserCard: FC<UserCardProps> = ({
    user,
    onDeleteUser,
    onToggleUserRole,
    onManageUserFiles,
}) => {
    const { id, username, email, fullname, isAdmin } = user;
    console.log(user)

    const actionButtons = [
        {
            label: 'Delete User',
            onClick: () => onDeleteUser(id),
            color: 'bg-red-500',
            hoverColor: 'bg-red-600',
        },
        {
            label: isAdmin === 'true' ? 'Revoke Admin' : 'Make Admin',
            onClick: () => onToggleUserRole(id),
            color: 'bg-yellow-500',
            hoverColor: 'bg-yellow-600',
        },
        {
            label: 'Manage Files',
            onClick: () => { onManageUserFiles(id) },
            color: 'bg-blue-500',
            hoverColor: 'bg-blue-600',
        },
    ];

    return (
        <CardContainer onClick={() => { }}>
            <CardHeader title={username} />
            <CardBody text={`Email: ${email}`} />
            <CardBody text={`Fullmane: ${fullname}`} />
            <CardBody text={`is_admin: ${isAdmin}`} />
            {actionButtons.map((button, index) => (
                <ActionButton
                    key={index}
                    onClick={button.onClick}
                    color={button.color}
                    hoverColor={button.hoverColor}
                >
                    {button.label}
                </ActionButton>
            ))}
        </CardContainer>
    );
};

export default UserCard;
