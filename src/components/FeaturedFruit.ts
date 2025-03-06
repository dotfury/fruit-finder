import Store from '@/services/store';
import { BASE_URL } from '@/utils/constants';

export default class FeaturedFruit extends HTMLElement {
  header: HTMLElement | null;
  text: HTMLElement | null;
  container: HTMLElement | null;

  constructor() {
    super();

    this.header = null;
    this.text = null;
    this.container = null;
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
  }

  render() {
    this.header = this.querySelector('h3')!;
    this.text = this.querySelector('p')!;
    this.container = this.querySelector('a')!;
    const fruitName = Store.featuredFruit.name;

    this.header.textContent = fruitName;
    this.text.textContent = `${Store.featuredFruit.nutritions.calories}cal`;
    // navigate by router
    this.container.setAttribute('href', `${BASE_URL}/detail-${fruitName}`);
  }
}
