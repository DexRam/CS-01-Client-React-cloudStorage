import { FC } from 'react';
import FileCard from '../File/FileCard';
import { CardContainer } from '../UIComponents/Containers';
import { CardHeader, CardBody } from '../UIComponents/Cards';
import { ActionButton } from '../UIComponents/Actions';
import { UserCardProps } from './interfaces';

const UserCard: FC<UserCardProps> = ({
    user,
    isSelected,
    onUserClick,
    onDeleteUser,
    onToggleUserRole,
    files,
    onDownload,
    onRename,
    onDelete,
    onShare,
    showCheckbox,
}) => {
    const { userId, userName, userEmail, userRole } = user;

    const actionButtons = [
        {
            label: 'Delete User',
            onClick: () => onDeleteUser(userId),
            color: 'bg-red-500',
            hoverColor: 'bg-red-600',
        },
        {
            label: userRole === 'admin' ? 'Revoke Admin' : 'Make Admin',
            onClick: () => onToggleUserRole(userId),
            color: 'bg-yellow-500',
            hoverColor: 'bg-yellow-600',
        },
    ];

    return (
        <CardContainer isSelected={isSelected} onClick={() => onUserClick(userId)}>
            <CardHeader title={userName} />
            <CardBody text={`Email: ${userEmail}`} />
            <CardBody text={`Role: ${userRole}`} />
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
            {isSelected && (
                <>
                    <h4 className="text-xl mt-4">Files:</h4>
                    {files.map((file) => (
                        <FileCard
                            key={file.fileId}
                            file={file}
                            isSelected={false}
                            onToggleSelect={() => { }}
                            onDownload={onDownload}
                            onRename={onRename}
                            onDelete={onDelete}
                            onShare={onShare}
                            showCheckbox={showCheckbox}
                        />
                    ))}
                </>
            )}
        </CardContainer>
    );
};

export default UserCard;
