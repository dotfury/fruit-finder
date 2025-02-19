import './style.css';
import Store from '@/services/store';

window.addEventListener('DOMContentLoaded', async () => {
  Store.init();
  console.log(Store);
});
