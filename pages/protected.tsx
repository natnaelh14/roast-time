import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Router from 'next/router';

const Protected: NextPage = (): JSX.Element => {
    const { status, data } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") Router.replace('/signin');
        console.log({ data })
    }, [status, data]);

    if (status === 'authenticated')
        return (
            <div className='flex items-center justify-center'>You are Logged In.</div>
        )
    return <div>Loading...</div>
}

export default Protected;
