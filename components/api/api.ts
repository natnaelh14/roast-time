import axios, { AxiosRequestHeaders } from 'axios';

export const getSession = () => axios.get('/api/user');

const getHeader = (token?: string): AxiosRequestHeaders => {
  return {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': `${process.env.NEXT_PUBLIC_BASE_URL}`,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
    Authorization: `Bearer ${token}`,
  };
};
const AXIO_TIMEOUT = 30000;

export const updateReservation = async ({
  token,
  accountId,
  reservationId,
  updateReservationPayload,
}: {
  token: string;
  accountId: string;
  reservationId: string;
  updateReservationPayload: {
    partySize: number;
    reservationDate: Date;
    reservationTime: string;
  };
}) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${accountId}/update/${reservationId}`,
      updateReservationPayload,
      {
        timeout: AXIO_TIMEOUT,
        headers: getHeader(token),
      },
    );
    return { data, hasError: false };
  } catch (e) {
    return { e, hasError: true };
  }
};

export const deleteReservation = async (
  token: string,
  accountId: string,
  reservationId: string,
) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reservation/${accountId}/delete/${reservationId}`,
      {
        timeout: AXIO_TIMEOUT,
        headers: getHeader(token),
      },
    );
    return { data, hasError: false };
  } catch (e) {
    return { e, hasError: true };
  }
};
