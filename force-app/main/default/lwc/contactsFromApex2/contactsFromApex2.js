import { LightningElement, api, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
 
export default class showContact extends LightningElement {
  @api recordId; // Account Id passed from Lightning Record Page
 
  contacts = [];
  error;
 
  @wire(getRelatedListRecords, {
    parentRecordId: '$recordId',
    relatedListId: 'Contacts',
    fields: ['Contact.Id', 'Contact.Name', 'Contact.Email', 'Contact.Phone']
  })
  wiredContacts({ error, data }) {
    if (data) {
      this.contacts = data.records;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.contacts = [];
    }
  }
}