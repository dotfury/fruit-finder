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
    console.log(Store.featuredFruit);
    this.querySelector('p')!.textContent = Store.featuredFruit.name;
  }
}
