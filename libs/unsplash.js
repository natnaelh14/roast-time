// initialize unsplash
import { createApi } from 'unsplash-js';

// on your node server
export const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});
