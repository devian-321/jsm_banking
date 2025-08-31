'use server'


import { ID, Query, TablesDB } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appWrite"
import { cookies } from "next/headers";
import { parseStringify } from "../utils";


async function getUserInfo(){
    const {account} = await createSessionClient()
    const user = await account.get()
    return user
}


export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession({ email: email, password: password });
        cookies().set(process.env.SESSION_NAME!, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        const user = await getUserInfo()
        console.log("userrr",user)
        return user
    } catch (error) {
        console.error('Error', error);
    }
}

export const signUp = async (userData: SignUpParams) => {
    //Create a user account
    try {
        const email = userData.email;
        const password = userData.password;
        const name = `${userData.firstName} ${userData.lastName}`;
        const { account } = await createAdminClient();
        const newUserAccount = await account.create({ userId: String(ID.unique()), email, password, name })
        const session = await account.createEmailPasswordSession({ email, password });
        cookies().set(process.env.SESSION_NAME ?? "session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)

    } catch (error) {
        console.error('Error', error);
    }
}


export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        return null;
    }
}


export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();
        cookies().delete(process.env.SESSION_NAME!)
        await account.deleteSession({ sessionId: 'current' })
    } catch {
        return null
    }
}