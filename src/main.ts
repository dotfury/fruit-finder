import '@/styles/normalize.css';
import '@/styles/style.css';

import { initStore } from '@/services/store';
import Router from '@/services/router';
import FeaturedFruit from '@/components/FeaturedFruit';
import FruitDetail from '@/components/FruitDetail';
import RecommendedFruits from '@/components/RecommendedFruits';
import RecomendedFruit from '@/components/RecommendedFruit';

customElements.define('featured-fruit', FeaturedFruit);
customElements.define('fruit-detail', FruitDetail);
customElements.define('recommended-fruits', RecommendedFruits);
customElements.define('recommended-fruit', RecomendedFruit);

window.addEventListener('DOMContentLoaded', () => {
  initStore();
  Router.init();
});
