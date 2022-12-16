import { Button } from 'components/Button';
import { Reservation } from 'types';
import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

const OrderItem = ({ reservation }: { reservation: Reservation }) => {
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <Image
              className="h-full w-full rounded-full"
              src={reservation?.user?.imageUrl || ''}
              height={75}
              width={75}
              alt="asdfghjkl"
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap text-gray-900">
              {reservation?.user?.firstName} {reservation?.user?.firstName}
            </p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">
          {reservation?.user?.phoneNumber}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">
          {dayjs(reservation.reservationDate).format('MM/DD/YYYY')}{' '}
          {reservation?.reservationTime}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        {reservation?.partySize}
      </td>
      <td className="flex flex-row items-start gap-2 border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <Button variant="primary">Edit</Button>
        <Button variant="secondary">Cancel</Button>
      </td>
    </tr>
  );
};

export default OrderItem;
