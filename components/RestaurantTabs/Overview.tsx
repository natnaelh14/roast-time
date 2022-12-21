import { Rating } from 'components/Rating';
import { OverviewLoading } from 'components/Loaders';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export const Overview = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: restaurant, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/restaurant/${id}`,
  );

  if (!restaurant && !error) return <OverviewLoading />;

  return (
    <>
      {restaurant && (
        <div className="my-5">
          <p className="text-5xl dark:text-white">{restaurant.name}</p>
          <div className="mt-2 flex flex-row">
            <Rating />
            <p className="ml-4 text-base text-gray-500 dark:text-gray-300">
              {restaurant.category}
            </p>
          </div>
          <p className="m-2 text-base leading-relaxed text-gray-500 dark:text-gray-300">
            {restaurant.address}
          </p>
          <p className="m-2 leading-relaxed text-gray-500">
            Located in the heart of Washington, D.C., steps from the National
            Mall, and across from Pershing Park, a national park home to the new
            World War 1 Memorial, Café du Parc is reminiscent of a
            Parisian-inspired sidewalk café.
          </p>
          <p className="m-2 leading-relaxed text-gray-500">
            Paying homage to traditional French cooking, the restaurant offers
            diners various culinary creations from coffee and pastries at its
            coffee shop, Le Café, to breakfast, lunch, dinner, and brunch on
            Sunday on its outside terrace or inside the main dining room.
          </p>
        </div>
      )}
    </>
  );
};
