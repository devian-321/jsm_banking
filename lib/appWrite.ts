"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";



export async function createSessionClient() {
    console.log(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const sessionName = process.env.SESSION_NAME;
    if (!sessionName) {
        throw new Error("SESSION_NAME environment variable is not defined");
    }
    const session = await cookies().get(sessionName);
    if (!session || !session.value) {
        throw new Error(`No session by the name: ${sessionName}`);
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get database() {
            return new Databases(client);
        },
        get user() {
            return new Users(client);
        }
    };
}
