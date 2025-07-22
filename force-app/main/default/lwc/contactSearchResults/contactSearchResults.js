import { LightningElement, api } from 'lwc';

export default class ContactSearchResults extends LightningElement {
  @api contacts = [];

  handleSelect(event) {
    const selectedEvent = new CustomEvent('select', {
      detail: event.detail
    });
    this.dispatchEvent(selectedEvent);
  }
}