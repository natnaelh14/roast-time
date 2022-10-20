import { useState } from "react";
import { RestaurantSignUpForm } from "components/Forms";
import { GetServerSideProps } from 'next';
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

const GetStarted = () => {

    const [loading, setLoading] = useState(false);
    if (loading) return <ThreeDotsLoading />

    return (
        <div className='flex flex-row items-center justify-center w-full min-h-[800px] form-background py-16'>
            <RestaurantSignUpForm setLoading={setLoading} />
        </div>
    )
}

export default GetStarted;
