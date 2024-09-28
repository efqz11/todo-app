import { Spinner } from '@/shared/components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper: React.FC = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do not redirect while loading
      if (!session) router.push('/login'); // Redirect to login if not authenticated
    }, [session, status, router]);

    if (status === 'loading' || !session) {
    //   return <div>Loading...</div>; // Optionally add a loading state
      return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner />
        </div>
      ); // Optionally add a loading state
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;