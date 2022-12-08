import { Reservation } from 'types';
import { Button } from 'components/Button';
import { updateReservation, deleteReservation } from 'components/api/api';
import { useUserSession } from 'contexts/UserSessionContext';
import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import Swal from 'sweetalert2';

const ReservationCard = ({
  reservation,
  isHistory,
  mutate,
}: {
  reservation: Reservation;
  isHistory?: boolean;
  mutate?: () => void;
}) => {
  const { userSession } = useUserSession();

  const { restaurant } = reservation;

  const handleUpdateReservation = () => {};

  const handleDeleteReservation = () => {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore the reservation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      // eslint-disable-next-line promise/always-return
      if (result.isConfirmed) {
        const { hasError } = await deleteReservation(
          // @ts-ignore:next-line
          userSession?.token,
          userSession?.account?.id,
          reservation?.id,
        );
        if (!hasError && mutate) {
          mutate();
          Swal.fire(
            'Deleted!',
            'Your reservation has been deleted.',
            'success',
          );
        }
      }
    });
  };

  return (
    <div className="w-lg flex min-w-80 flex-col overflow-hidden rounded border p-2 shadow-lg dark:border-gray-secondary md:flex-row">
      <Link href={`restaurant/${restaurant?.id}`} passHref>
        <a className="hover:cursor-pointer">
          <Image
            className=""
            src={restaurant.imageData[0]}
            height={275}
            width={325}
            alt={restaurant?.name}
          />
        </a>
      </Link>
      <div className="flex flex-col items-start px-6 py-4">
        <h1 className="mb-2 text-xl font-bold dark:text-white">
          {restaurant.name}
        </h1>
        <p className="text-base font-bold text-gray-500 dark:text-gray-300">
          <span className="font-medium">Party Size: </span>
          {reservation.partySize}
        </p>
        <p className="text-base font-extrabold text-gray-500 dark:text-gray-300">
          <span className="font-extrabold">Reservation: </span>
          {dayjs(reservation.reservationDate).format('MM/DD/YYYY')}{' '}
          {reservation.reservationTime}
        </p>
        <p className="my-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-blue-dark dark:text-gray-300">
          #{restaurant.category}
        </p>
        {!isHistory && (
          <>
            <Button className="my-2">Update</Button>
            <Button className="my-2" onClick={handleDeleteReservation}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
