import { Reservation } from 'types';
import { Button } from 'components/Button';
import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

const ReservationCard = ({
  reservation,
  isHistory,
}: {
  reservation: Reservation;
  isHistory?: boolean;
}) => {
  const { restaurant } = reservation;
  return (
    <div className="w-lg flex flex-row overflow-hidden rounded border p-2 shadow-lg dark:border-gray-secondary">
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
          #{restaurant?.category}
        </p>
        {!isHistory && (
          <>
            <Button className="my-2">Update</Button>
            <Button className="my-2">Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
