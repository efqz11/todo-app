import React from "react";
import { AddTodo, TodoList } from "@/features/todo/components";
import withAuth from "@/hoc/withAuth";
import { signOut, useSession } from "next-auth/react";
import { useQuotes, useTodos } from "@/features";

const IndexPage: React.FC = () => {
    const { data: session, status } = useSession();
    const { quote, author } = useQuotes();

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" });
    };

    useTodos();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">My To-Do List</h1>
                {status === "authenticated" && (
                    <div className="flex items-center">
                        <span className="mr-4 text-gray-600">{session.user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </header>

            <main className="flex-grow p-4">
                <AddTodo />
                <TodoList />
            </main>

            <div className="py-4 px-4 border-t border-gray-200">
                <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                    <span className="text-sm text-gray-500 "><span><blockquote>{quote} — {author}</blockquote></span></span>
                </div>
            </div>
        </div>
    );
};

export default withAuth(IndexPage);
