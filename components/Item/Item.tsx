import { SaveIcon } from 'components/Icons';
import { Rating } from 'components/Rating';
import { useUserSession } from 'contexts/UserSessionContext';
import Image from 'next/legacy/image';
import Link from 'next/link';

interface ItemProps {
  id: string;
  name: string;
  address: string;
  category: string;
  imageData: string[];
  refreshSavedRestaurants?: () => void;
}

const Item = ({
  id,
  name,
  imageData,
  address,
  category,
  refreshSavedRestaurants,
}: ItemProps) => {
  const { userSession } = useUserSession();
  const token = !!userSession?.token;

  return (
    <div>
      {imageData && (
        <div className="m-8 w-[250px] rounded-lg border border-gray-200 p-1 shadow-lg transition delay-150 ease-in-out hover:scale-105 dark:border-gray-secondary">
          <Link href={`/restaurant/${id}`} className="hover:cursor-pointer">
            <Image
              alt="shopping-item"
              src={imageData[0] || ''}
              width={250}
              height={200}
            />
          </Link>
          <div className="m-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-extrabold dark:text-white">{name}</p>
              {token && (
                <SaveIcon
                  restaurantId={id}
                  refreshSavedRestaurants={refreshSavedRestaurants}
                />
              )}
            </div>
            <Rating />
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {category}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{`${address}`}</p>
            <Link href={`/restaurant/${id}`} className="hover:cursor-pointer">
              <button
                type="submit"
                className="right-0-0 relative bottom-0 mt-3 w-full rounded bg-pink-primary py-2 px-4 text-base text-white hover:bg-orange-primary dark:text-black">
                Reserve
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
