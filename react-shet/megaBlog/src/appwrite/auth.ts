import envs from '../config/config';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(envs.appWriteUrl)
            .setProject(envs.appWriteProjectId);
        this.account = new Account(this.client);
    };

    createAccount = async ({ email, password, name }: { email: string, password: string, name: string }) => {
        try {
            const userAccount = await this.account.create({ userId: ID.unique(), email, password, name });

            if (userAccount) {
                this.login({ email, password });
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        };
    };

    login = async ({ email, password }: { email: string, password: string }) => {
        try {
            return await this.account.createEmailPasswordSession({ email : email, password : password });
        }
        catch (error) {
            throw error;
        };
    };

    logout = async () => {
        try {
            await this.account.deleteSessions();    
        } 
        catch (error) {
            throw error;
        };
    };

    getCurrentUser = async () => {
        try {
            return await this.account.get();
        }
        catch (error) {
            throw error;
        };

        return null;
    };
};

const authService = new AuthService();

export default authService;