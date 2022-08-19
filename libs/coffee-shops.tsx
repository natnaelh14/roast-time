import axios from "axios";
import { unsplashApi } from './unsplash';

export const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        perPage: 30,
    });
    const unsplashResults = photos.response?.results || [];
    return unsplashResults.map((result: any) => result.urls["small"]);
};

export const coffeeShopsFetcher = (url: string) => {
    return axios
        .get(url, {
            headers: {
                'Authorization': `${process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res: any) => res.data.results);
};

export const getUrlForCoffeeShops = (latLong: string, limit: number) => {
    return `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&limit=${limit}`;
}
