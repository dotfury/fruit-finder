interface Router {
  main: HTMLElement | null;
  init: () => void;
  navigate: (to: string, addToHistory?: boolean) => void;
}

const Router: Router = {
  main: null,
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

    Router.main.appendChild(document.createElement('featured-fruit'));
    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
