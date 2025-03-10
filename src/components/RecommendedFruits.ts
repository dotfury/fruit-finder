import Store from '@/services/store';

export default class RecommendedFruits extends HTMLElement {
  list: HTMLElement | null;

  constructor() {
    super();
    this.list = null;
  }

  connectedCallback() {
    const template: HTMLTemplateElement = (document.getElementById(
      'recommended-fruits-template'
    ) as HTMLTemplateElement)!;
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.render();
  }

  render(): void {
    if (!Store.suggestedFruit) return;
    console.log('hi: ', Store.suggestedFruit);
    this.list = this.querySelector('ul')!;
    Store.suggestedFruit.forEach((suggestedFruit) => {
      console.log(suggestedFruit);
      const item = document.createElement('recommended-fruit');
      item.dataset.fruitName = suggestedFruit.name;
      this.list?.appendChild(item);
    });
  }
}
