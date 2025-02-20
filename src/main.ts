import './style.css';
import Store from '@/services/store';

// find out more URL: https://www.google.com/search?q={fruit}

window.addEventListener('DOMContentLoaded', async () => {
  Store.init();
  console.log(Store);
});
