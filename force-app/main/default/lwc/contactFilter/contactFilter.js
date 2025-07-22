import { LightningElement, api } from 'lwc';

export default class ContactFilter extends LightningElement {
  searchKey = '';

  handleChange(event) {
    this.searchKey = event.target.value;
  }

  handleSearch() {
    const searchEvent = new CustomEvent('search', {
      detail: this.searchKey
    });
    this.dispatchEvent(searchEvent);
  }
}