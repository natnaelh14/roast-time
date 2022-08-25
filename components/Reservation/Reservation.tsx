import { SubmitButton } from "../Button/SubmitButton";
import { TextInput } from "../Forms/TextInput";
import { sleep } from "utils/helpers";
import { useForm } from "react-hook-form";

const Reservation = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async () => {
        await sleep(2000);
        console.log("Logged in");
    };
    return (
        <div className="flex w-auto flex-col items-center justify-between border-gray-200 border-2 shadow-lg bg-white px-16 py-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl lg:text-3xl text-center">Make a reservation</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full" autoComplete="off">
                <TextInput
                    control={control}
                    name="partySize"
                    label="Party Size"
                    autoComplete="off"
                />
                <TextInput
                    control={control}
                    name="date"
                    label="Date"
                    type="text"
                    autoComplete="off"
                />
                <div className="flex flex-col items-center mt-6">
                    <SubmitButton
                        text="Find a time"
                        submittingText="Finding..."
                        isSubmitting={isSubmitting}
                        className="w-auto shadow-lg"
                    />
                </div>
            </form>
        </div>
    )
}

export default Reservation
