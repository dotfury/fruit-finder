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
    console.log(fruit);
    const head = this.querySelector('h3')!;
    const text = this.querySelector('p')!;
    const link = this.querySelector('a')!;

    if (!fruit) {
      head.textContent = 'Not Found';
      text.textContent = `No data on ${this.dataset.fruitId} was found.`;
    } else {
      head.textContent = fruit.name;
      text.textContent = `${fruit.nutritions.calories}cal`;
      link.textContent = `Find out more about ${fruit.name}`;
      link.setAttribute(
        'href',
        `https://www.google.com/search?q=${fruit.name}`
      );
    }
  }
}
