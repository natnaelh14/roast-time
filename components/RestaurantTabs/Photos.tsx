import { OverviewLoading } from 'components/Loaders';
import Image from 'next/image';
import useSWR from 'swr';
import { useRouter } from 'next/router';

export const Photos = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: restaurant, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/search/restaurant/${id}`,
  );

  if (!restaurant && !error) return <OverviewLoading />;

  return (
    <div className="my-5 flex flex-wrap justify-around">
      {restaurant.imageData.map((image: string, i: number) => {
        return (
          <div className="m-4" key={i}>
            <Image alt="shopping-item" src={image} width={200} height={150} />
          </div>
        );
      })}
    </div>
  );
};
