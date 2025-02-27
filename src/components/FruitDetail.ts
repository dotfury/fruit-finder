import Store from '@/services/store';

export default class FruitDetail extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log('connected details');
  }

  render() {}
}
