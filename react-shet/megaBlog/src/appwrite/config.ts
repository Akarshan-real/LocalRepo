import secret from '../config/config';
import { Client, ID, Query, Storage, TablesDB } from "appwrite";

export type TableType = {
    title: string,
    content: string,
    featuredImage: unknown,
    status: string,
    userId: string
};

export class Service {
    client = new Client();
    table;
    storage;

    constructor() {
        this.client.setEndpoint(secret.appWriteUrl).setProject(secret.appWriteProjectId);

        this.table = new TablesDB(this.client);

        this.storage = new Storage(this.client);
    };

    createPost = async ({ title, slug, content, featuredImage, status, userId }: TableType & { slug: string }) => {
        try {
            await this.table.createRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            });
        }
        catch (error) {
            throw error;
        }
    };

    updatePost = async (slug: string, { title, content, featuredImage, status }: Omit<TableType, "userId">) => {
        try {
            return await this.table.updateRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            });
        } catch (error) {
            throw error;
        };
    };

    deletePost = async (slug: string) => {
        try {
            await this.table.deleteRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug
            });
            return true;
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getPost = async (slug: string) => {
        try {
            return await this.table.getRow({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                rowId: slug
            })
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getPosts = async (queries: string[] = [Query.equal("status", "active")]) => {
        try {
            return await this.table.listRows({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: queries
            })
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getPostsByStatus = async (status: "active" | "inactive") => {
        try {
            return await this.table.listRows({
                databaseId: secret.appWriteDataBaseId,
                tableId: secret.appWriteTableId,
                queries: [Query.equal("status", status)]
            })
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    uploadFile = async (file: File) => {
        try {
            return await this.storage.createFile({
                bucketId: secret.appWriteBucketId,
                fileId: ID.unique(),
                file: file
            })
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    deleteFile = async (fileId: string) => {
        try {
            await this.storage.deleteFile({
                bucketId: secret.appWriteBucketId,
                fileId: fileId
            });
            return true;
        }
        catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        }
    };

    getFilePreview = async (fileId : string) => {
        try {
            return await this.storage.getFilePreview({
                bucketId : secret.appWriteBucketId,
                fileId : fileId
            });
        } catch (error) {
            console.log("Appwrite error :: ", error);
            return false;
        };
    };
};

const newService = new Service();

export default newService;