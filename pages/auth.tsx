import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!session ? (
        <div>
          <p>Please log in</p>
          <button
            onClick={() => signIn()}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}