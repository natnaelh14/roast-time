import Item from 'components/Item/Item';
import { ThreeDotsLoading, DashboardLoading } from 'components/Loaders';
import { useRestaurantContext } from 'contexts/RestaurantsContext';
import { Restaurant } from 'types';
import EmptyState from 'components/EmptyState/EmptyState';

const Dashboard = () => {
  const { restaurantsData, error, restaurantSearch } = useRestaurantContext();
  const restaurants = restaurantsData?.restaurants;

  if (!restaurants && !error && !restaurantSearch?.length)
    return <DashboardLoading />;
  if (!restaurants && !error && restaurantSearch?.length)
    return <ThreeDotsLoading />;
  if (error) return <EmptyState message="No restaurants found" />;

  return (
    <div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
      {restaurants &&
        restaurants.map((item: Restaurant) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              imageData={item.imageData}
              address={item.address}
              category={item.category}
            />
          );
        })}
    </div>
  );
};

export default Dashboard;
