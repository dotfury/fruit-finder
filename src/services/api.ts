const API = {
  url: 'https://www.fruityvice.com/api/fruit/all',
  fetchFruit: async () => {
    const result = await fetch(API.url);
    return await result.json();
  },
};

export default API;
