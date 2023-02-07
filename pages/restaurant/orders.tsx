import { sessionOptions } from 'utils/config';
import OrderItem from 'components/Order/OrderItem';
import { Reservation, Restaurant } from 'types';
import { ThreeDotsLoading } from 'components/Loaders';
import { useColorScheme } from 'contexts/ColorSchemeContext';
import EmptyState from 'components/EmptyState/EmptyState';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import useSWR from 'swr';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { user } = req.session;
    const accountId = user?.account?.id;
    const restaurant = user?.account?.restaurant;
    const token = user?.token;
    const accountType = user?.account?.accountType;

    if (!user?.isLoggedIn) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    if (accountType === 'GUEST') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        accountId: accountId || '',
        restaurant: restaurant || '',
        token: token || '',
      },
    };
  },
  sessionOptions,
);

const Orders = ({
  token,
  accountId,
  restaurant,
}: {
  token: string;
  accountId: string;
  restaurant: Restaurant;
}) => {
  const { colorScheme } = useColorScheme();
  const [reservationDate, setReservationDate] = useState<Date | null>(null);

  const { data, error, mutate } = useSWR(
    token
      ? [
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/reservations/${accountId}/restaurant/${restaurant?.id}/${
            dayjs(reservationDate).isValid()
              ? dayjs(reservationDate).add(1, 'days').utc().format()
              : ''
          }`,
          token,
        ]
      : null,
  );
  const reservations = data?.reservations;

  if (!reservations && !error) return <ThreeDotsLoading />;

  return (
    <div className="flex min-h-[700px] justify-center">
      <div className="m-8 h-fit w-full rounded-md border-gray-200 bg-white p-8 shadow-xl dark:border-gray-secondary dark:bg-blue-dark lg:w-2/3">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-brown-dark md:text-3xl">
              {restaurant?.name}
            </h2>
            <span className="dark:text-brown-light md:text-xl">
              All reservations
            </span>
          </div>
          <DatePicker
            label="Filter Date"
            placeholder="MM/DD/YYYY"
            defaultValue={null}
            styles={() => ({
              day: {
                backgroundColor: colorScheme === 'dark' ? '#253443' : '',
              },
              label: {
                color: colorScheme === 'dark' ? '#cfcfcf' : '#737373',
                fontSize: '1rem',
              },
              input: {
                color: colorScheme === 'dark' ? '#cfcfcf' : '#737373',
              },
            })}
            variant="unstyled"
            required={true}
            value={reservationDate}
            onChange={setReservationDate}
          />
        </div>
        {reservations?.length ? (
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead className="bg-gray-300 dark:bg-blue-primary">
                    <tr>
                      <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-secondary dark:text-gray-300">
                        Name
                      </th>
                      <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-secondary dark:text-gray-300">
                        Phone Number
                      </th>
                      <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-secondary dark:text-gray-300">
                        Time
                      </th>
                      <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-secondary dark:text-gray-300">
                        Party Size
                      </th>
                      <th className="border-b-2 border-gray-200 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:border-gray-secondary dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-100 dark:bg-blue-light">
                    {reservations.map((reservation: Reservation) => {
                      return (
                        <OrderItem
                          key={reservation.id}
                          reservation={reservation}
                          mutate={mutate}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState message="No reservation available" />
        )}
      </div>
    </div>
  );
};

export default Orders;
