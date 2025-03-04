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
      Router.navigate(event.state.route, false);
    });

    Router.navigate(window.location.pathname);
  },
  navigate: (to: string, addToHistory: boolean = true) => {
    if (!Router.main) return;

    if (addToHistory) {
      history.pushState({ to }, '', to);
    }

    const BASE_URL = '/fruit-finder';

    switch (to) {
      case BASE_URL:
        Router.pageElement = document.createElement('featured-fruit');
        break;
      default:
        if (to.startsWith(`${BASE_URL}/detail-`)) {
          Router.pageElement = document.createElement('fruit-detail');
          const paramId = to.substring(to.lastIndexOf('-') + 1);

          console.log('ID: ', paramId);
        } else {
          alert('error');
        }
        break;
    }

    if (Router.pageElement) {
      if (Router.main.children[0]) {
        Router.main.children[0].remove();
      }

      Router.main.appendChild(Router.pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
