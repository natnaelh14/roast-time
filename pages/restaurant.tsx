import { SignInForm, RestaurantSignUpForm } from "../components/Forms";

const Restaurant = () => {
    return (
        <div className='flex flex-row items-center justify-around min-h-[800px] form-background'>
            <RestaurantSignUpForm />
            <SignInForm />
        </div>
    )
}

export default Restaurant;
