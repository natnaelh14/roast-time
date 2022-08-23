import { SubmitButton } from "../components/Button/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "../components/Forms/TextInput";

interface SignupFormValues {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
}

const SignUpForm = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        await sleep(2000);
        // console.log({ firstName, lastName, phoneNumber, email, password });
    };

    return (
        <div className='flex items-center justify-center min-h-[800px] form-background'>
            <div className="flex w-2/5 flex-col items-center justify-between border-gray-200 border-2 px-16 py-8 rounded-lg bg-white">
                <div className="mb-6 text-center">
                    <h1 className="text-pink-primary text-3xl">Get started with RoastTime today.</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <TextInput
                        control={control}
                        name="firstName"
                        label="First Name"
                        autoComplete="firstName"
                    />
                    <TextInput
                        control={control}
                        name="lastName"
                        label="Last Name"
                        autoComplete="lastName"
                    />
                    <TextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone Number"
                        autoComplete="phoneNumber"
                    />
                    <TextInput
                        control={control}
                        name="email"
                        label="Email"
                        autoComplete="email"
                    />
                    <TextInput
                        control={control}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <div className="mt-6 flex justify-center">
                        <SubmitButton
                            text="Sign Up"
                            submittingText="Signing up..."
                            isSubmitting={isSubmitting}
                            className="w-auto shadow-lg"
                        />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignUpForm;
