import { BASE_URL } from '@/utils/constants';
interface Router {
  main: HTMLElement | null;
  pageElement: HTMLElement | null;
  init: () => void;
  navigate: (to: string, addToHistory?: boolean) => void;
}

const Router: Router = {
  main: null,
  pageElement: null,
  init: () => {
    Router.main = document.querySelector('main');

    window.addEventListener('popstate', (event) => {
      Router.navigate(event.state.to, false);
    });

    Router.navigate(window.location.pathname);
  },
  navigate: (to: string, addToHistory: boolean = true) => {
    if (!Router.main) return;

    if (addToHistory) {
      history.pushState({ to }, '', to);
    }

    switch (to) {
      case BASE_URL:
        Router.pageElement = document.createElement('featured-fruit');
        break;
      default:
        if (to.startsWith(`${BASE_URL}detail-`)) {
          Router.pageElement = document.createElement('fruit-detail');
          const fruit = to.substring(to.lastIndexOf('-') + 1);
          Router.pageElement.dataset.fruitId = fruit;
        } else {
          alert('error');
        }
        break;
    }

    if (Router.pageElement) {
      document.startViewTransition(() => {
        if (Router.main?.children[0]) {
          Router.main.children[0].remove();
        }

        Router.main?.appendChild(Router.pageElement!);
        window.scrollX = 0;
        window.scrollY = 0;
      });
    }
  },
};

export default Router;
