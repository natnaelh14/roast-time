import { RestaurantSignUpForm } from "components/Forms";
import { GetServerSideProps } from 'next';

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

const GetStarted = () => {
    return (
        <div className='flex flex-row items-center justify-center w-full min-h-[800px] form-background py-16'>
            <RestaurantSignUpForm />
        </div>
    )
}

export default GetStarted;
