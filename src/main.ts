import '@/styles/normalize.css';
import '@/styles/style.css';

import Store from '@/services/store';
import Router from '@/services/router';
import FeaturedFruit from '@/components/FeaturedFruit';
import FruitDetail from '@/components/FruitDetail';

customElements.define('featured-fruit', FeaturedFruit);
customElements.define('fruit-detail', FruitDetail);

// find out more URL: https://www.google.com/search?q={fruit}

window.addEventListener('DOMContentLoaded', async () => {
  Store.init();
  Router.init();
  console.log(Store);
});
