import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validation';
import { useAuthStore } from '../state/authSlice';
import { Button } from '@/shared/components';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
  }

const Register: React.FC = () => {
    const { isLoading, registerUser } = useAuthStore();
    const router = useRouter();


  const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const [serverError, setServerError] = useState("");

    const onSubmit = async (data: RegisterForm) => {
        try {
            await registerUser(data.name, data.email, data.password);
            router.push('/');
          // Call your registration API here
          // await registerUser(data);
          console.log('Registration data:', data);
        } catch (error) {
            if (error instanceof Error) {
              setServerError(error.message);
            } else {
              setServerError('Registration failed. Please try again.');
            }
        }
      };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const response = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       router.push('/login'); // Redirect to login page after successful registration
//     }
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Name</label>
              <input
                {...register('name')}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                {...register('email')}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                {...register('password')}
                type='password'
                required
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
            Register
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign In here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
