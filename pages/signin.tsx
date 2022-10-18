import { SignInForm } from "components/Forms";
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import ThreeDotsLoading from 'components/Loaders/ThreeDotsLoading';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // if (session) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //             permanent: false,
    //         },
    //     }
    // }
    return {
        props: {}
    }
}

const SignIn = () => {
    const [loading, setLoading] = useState(false);
    if (loading) return <ThreeDotsLoading />

    return (
        <div className='flex items-center justify-center min-h-[800px] form-background'>
            <SignInForm setLoading={setLoading} />
        </div>
    )
}

export default SignIn;
