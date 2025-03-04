import Store from '@/services/store';

export default class FeaturedFruit extends HTMLElement {
  constructor() {
    super();
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
    this.querySelector('h3')!.textContent = Store.featuredFruit.name;
    this.querySelector('p')!.textContent =
      `${Store.featuredFruit.nutritions.calories}cal`;
  }
}
