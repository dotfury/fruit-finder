import { getFruit } from '@/services/store';

export default class FruitDetail extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template: HTMLTemplateElement = (document.getElementById(
      'fruit-detail-template'
    ) as HTMLTemplateElement)!;
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.render();
  }

  render() {
    const fruit = getFruit(this.dataset.fruitId);
    const head = this.querySelector('h3')!;
    const text = this.querySelector('p')!;

    if (!fruit) {
      head.textContent = 'Not Found';
      text.textContent = `No data on ${this.dataset.fruitId} was found.`;
    } else {
      head.textContent = fruit.name;
      text.textContent = `${fruit.nutritions.calories}cal`;
    }
  }
}
