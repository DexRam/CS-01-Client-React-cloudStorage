import { User } from "../User/interfaces";
import { File } from "../File/interfaces";

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const ACCESS_PERMISSIONS = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

const Users: User[] = [
  {
    userId: 1,
    userName: 'JohnDoe',
    userFullname: 'John Doe',
    userEmail: 'john.doe@example.com',
    userRole: USER_ROLES.ADMIN,
    storagePath: 'path/to/storage/JohnDoe',
  },
  {
    userId: 2,
    userName: 'JaneSmith',
    userFullname: 'Jane Smith',
    userEmail: 'jane.smith@example.com',
    userRole: USER_ROLES.USER,
    storagePath: 'path/to/storage/JaneSmith',
  },
  {
    userId: 3,
    userName: 'BobJohnson',
    userFullname: 'Bob Johnson',
    userEmail: 'bob.johnson@example.com',
    userRole: USER_ROLES.USER,
    storagePath: 'path/to/storage/BobJohnson',
  },
];

const files: File[] = [
  {
    fileId: 1,
    fileName: 'document.pdf',
    fileSize: 345678,
    fileType: 'application/pdf',
    creationDate: '2024-06-10T08:30:00Z',
    modificationDate: '2024-06-10T10:45:00Z',
    filePath: '/files/document.pdf',
    fileOwner: 'user123',
    accessPermissions: ACCESS_PERMISSIONS.PRIVATE,
    metadata: {
      tags: ['important', 'work'],
      description: 'Work-related document',
    },
  },
  {
    fileId: 2,
    fileName: 'photo.jpg',
    fileSize: 789012,
    fileType: 'image/jpeg',
    creationDate: '2024-06-11T12:15:00Z',
    modificationDate: '2024-06-11T12:15:00Z',
    filePath: '/images/photo.jpg',
    fileOwner: 'user456',
    accessPermissions: ACCESS_PERMISSIONS.PUBLIC,
    metadata: {
      tags: ['vacation', 'beach'],
      description: 'Photo from vacation',
    },
  },
  {
    fileId: 3,
    fileName: 'backup.zip',
    fileSize: 123456789,
    fileType: 'application/zip',
    creationDate: '2024-06-09T14:00:00Z',
    modificationDate: '2024-06-09T14:00:00Z',
    filePath: '/backups/backup.zip',
    fileOwner: 'user789',
    accessPermissions: ACCESS_PERMISSIONS.PRIVATE,
    metadata: {
      tags: ['backup', 'system'],
      description: 'System backup',
    },
  },
];

export { Users, files };
