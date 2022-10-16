import { SubmitButton } from "../Button/SubmitButton";
import { DateInput } from "../Forms";
import { sleep } from "utils/helpers";
import { useForm } from "react-hook-form";
import { Select } from "components/Forms/Select";
import { SelectOptionProps } from "types";
import { useRouter } from "next/router";

interface FormValues {
    partySize: number,
    reserveDate: Date
}

const Reservation = () => {
    const router = useRouter();
    const { control, handleSubmit, formState } = useForm<FormValues>({
        mode: "onTouched", defaultValues: { partySize: 1 }
    });
    const { isSubmitting } = formState;
    const onSubmit = async (data: FormValues) => {
        await sleep(2000);
        console.log("reservation", data);
        router.push('/thank-you')
    };

    const people: SelectOptionProps[] = [
        { value: 1, label: "1 person" },
        { value: 2, label: "2 people" },
        { value: 3, label: "3 people" },
        { value: 4, label: "4 people" },
        { value: 5, label: "5 people" },
        { value: 6, label: "6 people" },
        { value: 7, label: "7 people" },
        { value: 8, label: "8 people" },
        { value: 9, label: "9 people" },
        { value: 10, label: "10 people" },
    ];

    return (
        <div className="w-fit h-fit flex flex-col items-center lg:justify-between border-gray-200 dark:border-gray-secondary border-2 shadow-lg bg-white dark:bg-blue-dark px-16 py-8 mt-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl lg:text-3xl text-center">Make a reservation</h1>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full" autoComplete="off">
                <Select
                    control={control}
                    label="Party Size"
                    name="partySize"
                    options={people}
                />
                <DateInput
                    control={control}
                    label="Select Date"
                    name="reserveDate"
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
