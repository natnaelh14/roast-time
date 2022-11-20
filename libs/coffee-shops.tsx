import { unsplashApi } from './unsplash';
import axios from 'axios';

interface ResultsProperties {
  fsq_id: string;
  name: string;
  categories: string[];
  location: {
    formatted_address: string;
  };
}

export const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 30,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result: any) => result.urls.small);
};

export const coffeeShopsFetcher = (url: string) => {
  return axios
    .get(url, {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((res: any) => res.data.results)
    .then((res: any) => {
      return res.map((result: ResultsProperties) => {
        return {
          id: result.fsq_id,
          title: result.name,
          location: result.location.formatted_address,
          categories: result.categories,
        };
      });
    });
};

export const getUrlForCoffeeShops = (latLong: string, limit: number) => {
  return `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&limit=${limit}`;
};
