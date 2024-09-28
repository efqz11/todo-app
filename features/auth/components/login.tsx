import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "../state/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation";
import { Button, Spinner } from "@/shared/components";

interface LoginForm {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { isLoading, login } = useAuthStore();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const [serverError, setServerError] = useState("");

    const onSubmit = async (data: LoginForm) => {
        try {
            await login(data.email, data.password);
            router.push("/"); // Redirect to home page after successful login
        } catch (error) {
            setServerError("Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold text-center text-gray-900">Sign In</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('email')}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                {...register('password')}
                                required
                                type='password'
                                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Password"
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                    </div>

                    {serverError && <span className="text-red-500">{serverError}</span>}
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        isLoading={isLoading}
                    >
                        {"Sign In"}
                    </Button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
