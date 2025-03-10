import Router from '@/services/router';
import { BASE_URL } from '@/utils/constants';

export default class RecomendedFruit extends HTMLElement {
  root: ShadowRoot;
  header: HTMLElement | null;
  button: HTMLButtonElement | null;
  fruit: string;

  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.header = null;
    this.button = null;
    this.fruit = '';
  }

  connectedCallback() {
    const template: HTMLTemplateElement = (document.getElementById(
      'recommended-fruit-template'
    ) as HTMLTemplateElement)!;
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);
    this.fruit = this.dataset.fruitName;

    this.render();
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', () => this.goToDetails());
  }

  render(): void {
    this.header = this.root.querySelector('h4')!;
    this.button = this.root.querySelector('button')!;

    this.header.textContent = this.fruit;

    this.button.addEventListener('click', () => this.goToDetails());
  }

  goToDetails(): void {
    Router.navigate(`${BASE_URL}/detail-${this.fruit}`);
  }
}
