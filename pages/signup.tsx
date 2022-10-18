import { GuestSignUpForm } from 'components/Forms/GuestSignUpForm';
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

const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    if (loading) return <ThreeDotsLoading />

    return (
        <div className='flex items-center justify-center min-h-[800px] form-background'>
            <GuestSignUpForm setLoading={setLoading} />
        </div>

    );
};

export default SignUpForm;
