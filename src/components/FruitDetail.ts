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
    const family = this.querySelector('.family')!;
    const nutrition = this.querySelector('.nutrition')!;
    const link = this.querySelector('a')!;

    if (!fruit) {
      head.textContent = 'Not Found';
      nutrition.textContent = `No data on ${this.dataset.fruitId} was found.`;
    } else {
      head.textContent = fruit.name;
      family.textContent = `
        family: ${fruit.family}
        genus: ${fruit.genus}
      `;
      nutrition.textContent = `
        calories: ${fruit.nutritions.calories}
        protein: ${fruit.nutritions.protein}
        carbohydrates: ${fruit.nutritions.carbohydrates}
        fat: ${fruit.nutritions.fat}
        sugar: ${fruit.nutritions.sugar}
      `;
      link.textContent = `Find out more about ${fruit.name}`;
      link.setAttribute(
        'href',
        `https://www.google.com/search?q=${fruit.name}`
      );
    }
  }
}
