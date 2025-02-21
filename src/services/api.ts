import fruitData from '@/data/fruits.json';

const API = {
  url: 'https://www.fruityvice.com/api/fruit/all',
  fetchFruit: async () => {
    try {
      const result = await fetch(API.url);

      // return local data if API issue
      if (!result.ok) {
        return fruitData;
      }

      return await result.json();
    } catch (error: any) {
      console.error('Error with API: ', error);
      // return local data if API issue
      return fruitData;
    }
  },
};

export default API;
