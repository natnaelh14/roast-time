import { sessionOptions } from 'utils/config';
import { Restaurant } from 'types';
import { ThreeDotsLoading } from 'components/Loaders';
import Item from 'components/Item/Item';
import EmptyState from 'components/EmptyState/EmptyState';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { user } = req.session;
    const accountId = user?.account?.id;
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
    if (accountType === 'RESTAURANT') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        accountId: accountId || null,
        token: token || null,
      },
    };
  },
  sessionOptions,
);

interface SavedRestaurantProps {
  id: string;
  userId: string;
  restaurantId: string;
  restaurant: Restaurant;
}

const SavedRestaurants = ({
  accountId,
  token,
}: {
  accountId: string;
  token: string;
}) => {
  const {
    data,
    error,
    mutate: refreshSavedRestaurants,
  } = useSWR([
    `${process.env.NEXT_PUBLIC_BASE_URL}/saved-restaurants/${accountId}`,
    token,
  ]);
  const savedRestaurants = data?.savedRestaurants;

  if (!savedRestaurants && !error) return <ThreeDotsLoading />;
  if (error || !savedRestaurants.length)
    return <EmptyState message="No saved restaurants found" />;

  return (
    <div className="my-10 min-h-160 text-3xl dark:text-white">
      <h1 className="m-4 text-center text-4xl text-brown-dark dark:text-brown-light">
        Saved Restaurants
      </h1>
      <div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
        {savedRestaurants.map((savedRestaurant: SavedRestaurantProps) => {
          return (
            <Item
              key={savedRestaurant?.id}
              id={savedRestaurant?.restaurant.id}
              name={savedRestaurant?.restaurant.name}
              imageData={savedRestaurant?.restaurant.imageData}
              address={savedRestaurant?.restaurant.address}
              category={savedRestaurant?.restaurant.category}
              refreshSavedRestaurants={refreshSavedRestaurants}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SavedRestaurants;
