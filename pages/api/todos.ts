import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions);

        // Ensure the user is authenticated
        if (!session?.user?.email) {
            return res.status(401).json({ error: 'You must be logged in.' });
        }

        const userId = session.user.id; // Get the current user's ID (assumed to be a GUID)

        if (req.method === "GET") {
            const todos = await prisma.todo.findMany({
                where: { userId },
                orderBy: [
                    { completed: 'asc' },
                    { createdAt: 'desc' }
                ]
            });
            return res.status(200).json(todos);
        }

        if (req.method === "PUT") {
            const { id, completed } = req.body;
            const updatedTodo = await prisma.todo.update({
                where: { id: id },
                data: { completed },
            });
            return res.status(200).json(updatedTodo);
        }

        if (req.method === "POST") {
            const { title } = req.body;
            const newTodo = await prisma.todo.create({
                data: {
                    title,
                    userId,
                },
            });
            return res.status(201).json(newTodo);
        }

        if (req.method === "DELETE") {
            const { id } = req.body;
            const todo = await prisma.todo.delete({
                where: {
                    id: Number(id),
                },
            });
            return res.status(200).json(todo);
        }

        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.log("error in todos api:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
