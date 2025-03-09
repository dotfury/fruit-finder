import '@/styles/normalize.css';
import '@/styles/style.css';

import { initStore } from '@/services/store';
import Router from '@/services/router';
import FeaturedFruit from '@/components/FeaturedFruit';
import FruitDetail from '@/components/FruitDetail';

customElements.define('featured-fruit', FeaturedFruit);
customElements.define('fruit-detail', FruitDetail);

window.addEventListener('DOMContentLoaded', () => {
  initStore();
  Router.init();
});
