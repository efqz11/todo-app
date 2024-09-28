import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

// Define the structure for the credentials
interface Credentials {
    email: string;
    password: string;
}

// Define the NextAuth options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Credentials | undefined): Promise<User | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Fetch user by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("No user found with this email");
                }

                // Compare hashed passwords
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }

                // Return user object without the password
                return {
                    id: user.id,
                    email: user.email,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // Attach user ID to the JWT
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        // Attach user ID to the session object
        async session({ session, token }) {
            console.log('Callback__Session:', session, token);
            if (session?.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login", // Custom login page
        error: "/auth/error", // Error page
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret for JWT signing
};

export default NextAuth(authOptions);
