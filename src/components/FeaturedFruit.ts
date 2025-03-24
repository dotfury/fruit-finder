import Store from '@/services/store';
import Router from '@/services/router';
import { BASE_URL } from '@/utils/constants';

export default class FeaturedFruit extends HTMLElement {
  header: HTMLElement | null;
  text: HTMLElement | null;
  container: HTMLElement | null;
  button: HTMLButtonElement | null;
  freaturedFruit: string;

  constructor() {
    super();

    this.header = null;
    this.text = null;
    this.container = null;
    this.button = null;
    this.freaturedFruit = '';
  }

  connectedCallback() {
    const template: HTMLTemplateElement = (document.getElementById(
      'featured-fruit-template'
    ) as HTMLTemplateElement)!;
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    window.addEventListener('featuredfruitchange', () => {
      this.render();
    });

    this.render();
  }

  disconnectedCallback() {
    this.button?.removeEventListener('click', () => this.goToDetails());
  }

  render(): void {
    if (!Store.featuredFruit) return;

    this.freaturedFruit = Store.featuredFruit.name;
    this.container = this.querySelector('div')!;
    this.header = this.container.querySelector('h3')!;
    this.text = this.container.querySelector('p')!;
    this.button = this.container.querySelector('button')!;

    this.header.textContent = this.freaturedFruit;
    this.text.textContent = `${Store.featuredFruit.nutritions.calories}cal`;

    const suggestions = document.createElement('recommended-fruits');
    this.appendChild(suggestions);

    this.button.addEventListener('click', () => this.goToDetails());
  }

  goToDetails(): void {
    Router.navigate(`${BASE_URL}detail-${this.freaturedFruit}`);
  }
}
