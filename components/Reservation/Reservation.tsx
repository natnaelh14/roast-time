import { SubmitButton } from '../Button/SubmitButton';
import { DateInput } from '../Forms';
import { Select } from 'components/Forms/Select';
import { SelectOptionProps } from 'types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

interface FormValues {
  partySize: number;
  reserveDate: Date;
}

const Reservation = () => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: { partySize: 1 },
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: FormValues) => {
    console.log('reservation', data);
    router.push('/thank-you');
  };

  const people: SelectOptionProps[] = [
    { value: 1, label: '1 person' },
    { value: 2, label: '2 people' },
    { value: 3, label: '3 people' },
    { value: 4, label: '4 people' },
    { value: 5, label: '5 people' },
    { value: 6, label: '6 people' },
    { value: 7, label: '7 people' },
    { value: 8, label: '8 people' },
    { value: 9, label: '9 people' },
    { value: 10, label: '10 people' },
  ];

  return (
    <div className="m-8 flex h-fit w-fit flex-col items-center rounded-lg border-2 border-gray-200 bg-white px-16 py-8 shadow-lg dark:border-gray-secondary dark:bg-blue-dark lg:justify-between">
      <div className="mb-6 text-center">
        <h1 className="text-center text-xl text-pink-primary lg:text-3xl">
          Make a reservation
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        autoComplete="off">
        <Select
          control={control}
          label="Party Size"
          name="partySize"
          options={people}
        />
        <DateInput control={control} label="Select Date" name="reserveDate" />
        <div className="mt-6 flex flex-col items-center">
          <SubmitButton
            text="Find a time"
            submittingText="Finding..."
            isSubmitting={isSubmitting}
            className="w-auto shadow-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default Reservation;
