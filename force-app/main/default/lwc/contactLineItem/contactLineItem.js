import { LightningElement, api } from 'lwc';

export default class ContactLineItem extends LightningElement {
  @api contact;

  get contactUrl() {
    return this.contact?.Id ? `/lightning/r/Contact/${this.contact.Id}/view` : '#';
  }

  get firstName() {
    return this.contact?.FirstName || 'N/A';
  }

  get lastName() {
    return this.contact?.LastName || 'N/A';
  }

  get email() {
    return this.contact?.Email || 'N/A';
  }

  get phone() {
    return this.contact?.Phone || 'N/A';
  }

  get accountName() {
    return this.contact?.Account?.Name || 'N/A';
  }

  handleClick() {
    if (this.contact) {
      const selectEvent = new CustomEvent('select', {
        detail: this.contact
      });
      this.dispatchEvent(selectEvent);
    }
  }
}