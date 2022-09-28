import { SignInForm } from "components/Forms";
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {}
    }
}

const SignIn = () => {

    return (
        <div className='flex items-center justify-center min-h-[800px] form-background'>
            <SignInForm />
        </div>
    )
}

export default SignIn;
