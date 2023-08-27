import { StorageConfig } from '@keystone-6/core/types';

export const storage: Record<string, StorageConfig> = {
    file: {
        // Images that use this store will be stored on the local machine
        kind: 'local',
        // This store is used for the image field type
        type: 'file',
        // The URL that is returned in the Keystone GraphQL API
        generateUrl: (path: string) => `${process.env.PUBLICURL}/files${path}`,
        // The route that will be created in Keystone's backend to serve the images
        serverRoute: {
            path: '/files',
        },
        storagePath: 'public/files',
    },
    image: {
        kind: 'local',
        type: 'image',
        generateUrl: (path: string) => `${process.env.PUBLICURL}/image${path}`,
        serverRoute: {
            path: '/image',
        },
        storagePath: 'public/images',
    }
};