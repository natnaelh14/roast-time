import { sessionOptions } from 'utils/config';
import OrderItem from 'components/Order/OrderItem';
import { Reservation, Restaurant } from 'types';
import { ThreeDotsLoading } from 'components/Loaders';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import useSWR from 'swr';
import { DatePicker } from '@mantine/dates';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { user } = req.session;
    const accountId = user?.account?.id;
    const restaurant = user?.account?.restaurant;
    const token = user?.token;

    if (!user?.isLoggedIn) {
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
  const { data, error, mutate } = useSWR(
    token
      ? [
          `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${accountId}/restaurant/${restaurant?.id}`,
          token,
        ]
      : null,
  );
  const reservations = data?.reservations;

  if (!reservations && !error) return <ThreeDotsLoading />;

  return (
    <div className="min-h-[800px] w-full rounded-md bg-white p-8">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-600">{restaurant?.name}</h2>
          <span className="text-xs">All reservations</span>
        </div>
        <div className="flex items-center rounded-md bg-gray-50 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="ml-1 block bg-gray-50 outline-none "
            type="text"
            name=""
            id=""
            placeholder="search name..."
          />
        </div>
        <DatePicker
          dropdownType="modal"
          defaultValue={new Date()}
          placeholder="Pick date"
          label="Filter date"
        />
      </div>
      <div>
        <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Name
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Phone Number
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Time
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Party Size
                  </th>
                  <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation: Reservation) => {
                  return <OrderItem reservation={reservation} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
