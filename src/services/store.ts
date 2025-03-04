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
}

const Store: Store = {
  featuredFruit: null,
  featuredFruitIndex: Infinity,
  suggestedFruitIndexes: [],
  allFruit: [],
  fruitCount: Infinity,
  suggestedFruit: [],
};

// proxy typing: https://norday.tech/posts/2023/typescript-proxy-objects/
const pStore = new Proxy(Store, {
  set(target: Store, property: keyof Store, value: any) {
    target[property] = value;

    if (property == 'featuredFruit') {
      window.dispatchEvent(new Event('featuredfruitchange'));
    }

    return true;
  },
});

export default pStore;

export async function initStore(): Promise<void> {
  const fruits = await API.fetchFruit();
  pStore.allFruit = fruits;
  pStore.fruitCount = pStore.allFruit.length;
  setFeaturedFruit();
  setSuggestedFruit();
}

function setFeaturedFruit(): void {
  pStore.featuredFruitIndex = Math.round(
    Math.random() * (pStore.fruitCount - 1)
  );
  pStore.featuredFruit = pStore.allFruit[pStore.featuredFruitIndex];
}

function setSuggestedFruit(): void {
  const result: Fruit[] = new Array(5).fill(1);

  pStore.suggestedFruit = result.map(() => getRandomFruit());
}

function getRandomFruit(): Fruit {
  const index = Math.round(Math.random() * (pStore.fruitCount - 1));

  if (
    pStore.suggestedFruitIndexes.includes(index) ||
    index == pStore.featuredFruitIndex
  ) {
    return getRandomFruit();
  }

  pStore.suggestedFruitIndexes.push(index);

  return pStore.allFruit[index];
}
