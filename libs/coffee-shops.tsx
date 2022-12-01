import { unsplashApi } from './unsplash';

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 50,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result: any) => result.urls.small);
};
