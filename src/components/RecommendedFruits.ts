import Store, { type Fruit } from '@/services/store';

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

    window.addEventListener('suggestedfruitchange', () => {
      this.render();
    });

    this.render();
  }

  render(): void {
    if (!Store.suggestedFruit) return;

    this.list = this.querySelector('ul')!;
    Store.suggestedFruit.forEach((suggestedFruit: Fruit) => {
      const item = document.createElement('recommended-fruit');
      item.dataset.fruitName = suggestedFruit.name;
      this.list?.appendChild(item);
    });
  }
}
