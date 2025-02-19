import API from '@/services/api';

const Store = {
  featuredFruit: null,
  featuredFruitIndex: null,
  allFruit: [],
  suggestedFruit: [],
  init: async () => {
    const fruits = await API.fetchFruit();
    Store.allFruit = fruits;
  },
};

export default Store;
