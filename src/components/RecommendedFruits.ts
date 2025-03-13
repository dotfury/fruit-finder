import Store, { type Fruit } from '@/services/store';

import elementStyles from '@/styles/recommended-fruits.css?inline';

export default class RecommendedFruits extends HTMLElement {
  root: ShadowRoot;
  list: HTMLElement | null;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.list = null;

    const styles = document.createElement('style');
    styles.textContent = elementStyles;
    this.root.appendChild(styles);
  }

  connectedCallback() {
    const template: HTMLTemplateElement = (document.getElementById(
      'recommended-fruits-template'
    ) as HTMLTemplateElement)!;
    const content = template.content.cloneNode(true);

    this.root.appendChild(content);

    window.addEventListener('suggestedfruitchange', () => {
      this.render();
    });

    this.render();
  }

  render(): void {
    if (!Store.suggestedFruit) return;

    this.list = this.root.querySelector('ul')!;
    Store.suggestedFruit.forEach((suggestedFruit: Fruit) => {
      const item = document.createElement('recommended-fruit');
      item.dataset.fruitName = suggestedFruit.name;
      this.list?.appendChild(item);
    });
  }
}
