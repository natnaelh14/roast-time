import { SignInForm, RestaurantSignUpForm } from "../../components/Forms";
import { Button } from "components/Button";
import { useState } from "react";

const GetStarted = () => {
    const [showSignInButton, setShowSignInButton] = useState(true);
    const [showSignUpButton, setShowSignUpButton] = useState(false);
    const handleButtonToggle = (buttonType: string) => {
        switch (buttonType) {
            case "Sign In":
                setShowSignInButton(true), setShowSignUpButton(false);
                break;
            case "Sign Up":
                setShowSignUpButton(true), setShowSignInButton(false);
                break;
            default:
                break;
        }

    }
    return (
        <div className='flex flex-col items-center min-h-[800px] form-background'>
            <div className='m-10 xl:hidden'>
                <Button variant="tertiary" className={`mx-6 ${showSignUpButton && 'opacity-50'}`} onClick={() => handleButtonToggle('Sign In')}>Sign In</Button>
                <Button variant="tertiary" className={`mx-6 ${showSignInButton && 'opacity-50'}`} onClick={() => handleButtonToggle('Sign Up')}>Sign Up</Button>
            </div>
            <div className='xl:hidden flex justify-center w-full'>
                {showSignUpButton && (
                    <RestaurantSignUpForm />
                )}
                {showSignInButton && (
                    <SignInForm />
                )}
            </div>
            <div className='mt-20 hidden xl:flex flex-row items-center justify-around w-full'>
                <RestaurantSignUpForm />
                <SignInForm />
            </div>

        </div>
    )
}

export default GetStarted;
