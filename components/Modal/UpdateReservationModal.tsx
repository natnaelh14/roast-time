import ModalWrapper from 'components/Modal/ModalWrapper';
import { Button, SubmitButton } from 'components/Button';
import { Select, TextInput } from 'components/Inputs';
import { SelectOptionProps, ReservationFormValues, Reservation } from 'types';
import { updateReservation, getSession } from 'components/api/api';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mantine/dates';
import Swal from 'sweetalert2';

const UpdateReservationModal = ({
  reservation,
  mutate,
}: {
  reservation: Reservation;
  mutate?: () => void;
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const {
    id: reservationId,
    partySize,
    reservationDate,
    reservationTime,
  } = reservation;
  const { control, handleSubmit, formState } = useForm<ReservationFormValues>({
    mode: 'onTouched',
    defaultValues: {
      partySize,
      reservationDate: new Date(reservationDate),
      reservationTime,
    },
  });
  const { isSubmitting } = formState;

  const onSubmit = async (data: ReservationFormValues) => {
    const { data: SessionData } = await getSession();
    const updateReservationPayload = {
      token: SessionData.token,
      accountId: SessionData.account.id,
      reservationId,
      reservation: { ...data },
    };
    const {
      data: updatedReservation,
      hasError,
      e,
    } = await updateReservation(updateReservationPayload);
    if (updatedReservation && mutate) {
      mutate();
      setIsOpen(false);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: 'success',
        title: 'Updated reservation successfully',
      });
    }
    if (hasError) {
      console.error('reservation update error', e);
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
    <div>
      <Button onClick={() => setIsOpen(true)} className="my-2">
        Update
      </Button>
      <ModalWrapper modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <div className="rounded-xl border border-gray-200 bg-white px-24 py-16 dark:border-gray-secondary dark:bg-blue-dark">
          <h1 className="mb-10 text-center text-3xl dark:text-gray-200">
            Update Reservation
          </h1>
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
            <div className="mt-10 flex flex-row items-end justify-center gap-6">
              <SubmitButton
                text="Update"
                submittingText="Updating..."
                isSubmitting={isSubmitting}
                className="w-auto shadow-lg"
              />
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </div>
          </form>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default UpdateReservationModal;
