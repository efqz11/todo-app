import React from "react";
import { Todo } from '@/entities';
import { FiTrash2 } from "react-icons/fi";
import { format } from "date-fns";
import { useModal } from "@/shared/components";
import { useTodoStore } from "../state/todoSlice";

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { removeTodo, toggleTodo } = useTodoStore();
    const { openModal } = useModal();

    const handleCheckboxChange = () => {
        toggleTodo(todo.id, !todo.completed);
    };

    const handleRemoveClick = () => {
        openModal("confirmation", {
            title: "Delete Todo",
            message: "Are you sure you want to delete this todo?",
            onConfirm: () => {
                removeTodo(todo.id);
                console.log("Todo deleted"); // Handle delete logic here
            },
        });
    };

    const formatCustomDate = (date: Date) => {
        return format(date, "dd MMM, yyyy HH:mm");
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-2">
            <div className="flex flex-col items-start">
                <span
                    className={`text-lg ${
                        todo.completed ? "line-through text-gray-400" : "text-black"
                    }`}
                >
                    {todo.title}
                </span>
                <small className="text-gray-400">{formatCustomDate(todo.createdAt)}</small>
            </div>
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
                />

                <button
                    onClick={() => handleRemoveClick()}
                    className="text-red-500 hover:text-red-700 transition-colors mx-4"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
        </div>
    );
};
