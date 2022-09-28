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
    console.log("session", data)

    if (status === 'authenticated')
        return (
            <div className='min-h-[600px] flex items-center justify-center text-2xl'>You are Logged In.</div>
        )
    return <div>Loading...</div>
}

export default Protected;
