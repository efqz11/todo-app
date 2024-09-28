import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const saltRounds = 10; // Number of rounds for salting

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        // Create new user in the database
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error registering new user:", error);
    }
}
