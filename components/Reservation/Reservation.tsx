import { SubmitButton } from 'components/Button';
import { Select, TextInput } from 'components/Inputs';
import { SelectOptionProps, ReservationFormValues } from 'types';
import { handleReservation } from 'components/api/api';
import { useUserSession } from 'contexts/UserSessionContext';
import { useColorScheme } from 'contexts/ColorSchemeContext';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import Swal from 'sweetalert2';

const Reservation = () => {
  const router = useRouter();
  const { id: restaurantId } = router.query;
  const { userSession } = useUserSession();
  const { colorScheme } = useColorScheme();

  const { control, handleSubmit, formState } = useForm<ReservationFormValues>({
    mode: 'onTouched',
    defaultValues: {
      partySize: 1,
      reservationDate: new Date(),
      reservationTime: '12:00',
    },
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: ReservationFormValues) => {
    try {
      const reservationPayload = {
        // @ts-ignore:next-line
        ...data,
        restaurantId,
        userId: userSession?.account?.id,
        token: userSession?.token,
      };
      // @ts-ignore:next-line
      const { hasError } = await handleReservation(reservationPayload);
      if (!hasError) {
        await Swal.fire({
          title: 'Congrats',
          text: 'Your reservation has been confirmed.',
          icon: 'success',
          color: `${colorScheme === 'dark' && '#cfcfcf'}`,
          background: `${colorScheme === 'dark' && '#253443'}`,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#F78888',
          iconColor: `${colorScheme === 'dark' ? '#facea8' : '#c69977'}`,
        });
        router.push('/restaurant/upcoming-reservations');
      }
      return;
    } catch (e) {
      console.error(e);
    }
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
        <Controller
          control={control}
          name="reservationDate"
          // @ts-ignore:next-line
          render={({ field: { onChange, value, name } }) => (
            <div className="mb-5">
              <DatePicker
                label="Select Date"
                placeholder="MM/DD/YYYY"
                defaultValue={new Date()}
                name={name}
                value={value}
                onChange={onChange}
                required={true}
              />
            </div>
          )}
        />
        <TextInput
          control={control}
          type="time"
          name="reservationTime"
          label="Select Time"
          required={true}
        />
        <div className="mt-6 flex flex-col items-center">
          <SubmitButton
            variant="primary"
            text="Reserve"
            submittingText="Reserving..."
            isSubmitting={isSubmitting}
            className="w-auto shadow-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default Reservation;
