import API from '@/services/api';

interface Fruit {
  family: string;
  genus: string;
  id: number;
  name: string;
  order: string;
  nutritions: {
    [key: string]: number;
  };
}

interface Store {
  featuredFruit: Fruit | null;
  featuredFruitIndex: number;
  suggestedFruitIndexes: number[];
  allFruit: Fruit[];
  fruitCount: number;
  suggestedFruit: Fruit[];
  init: () => void;
  setFeaturedFruit: () => void;
  setSuggestedFruit: () => void;
  getRandomFruit: () => Fruit;
}

const Store: Store = {
  featuredFruit: null,
  featuredFruitIndex: Infinity,
  suggestedFruitIndexes: [],
  allFruit: [],
  fruitCount: Infinity,
  suggestedFruit: [],
  init: async () => {
    const fruits = await API.fetchFruit();
    Store.allFruit = fruits;
    Store.fruitCount = Store.allFruit.length;
    Store.setFeaturedFruit();
    Store.setSuggestedFruit();
  },
  setFeaturedFruit: () => {
    Store.featuredFruitIndex = Math.round(
      Math.random() * (Store.fruitCount - 1)
    );
    Store.featuredFruit = Store.allFruit[Store.featuredFruitIndex];
  },
  setSuggestedFruit: () => {
    const result: Fruit[] = new Array(5).fill(1);

    Store.suggestedFruit = result.map(() => Store.getRandomFruit());
  },
  getRandomFruit: (): Fruit => {
    const index = Math.round(Math.random() * (Store.fruitCount - 1));

    if (
      Store.suggestedFruitIndexes.includes(index) ||
      index == Store.featuredFruitIndex
    ) {
      return Store.getRandomFruit();
    }

    Store.suggestedFruitIndexes.push(index);

    return Store.allFruit[index];
  },
};

export default Store;
