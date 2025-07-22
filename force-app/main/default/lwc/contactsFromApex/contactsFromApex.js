import { LightningElement, api, wire } from 'lwc';
import getContactsByAccountId from '@salesforce/apex/LWCContactController.getContactsByAccountId';

export default class AccountContacts extends LightningElement {
    @api recordId; // Automatically populated on record page
    contacts = [];
    error;

    @wire(getContactsByAccountId, { accountId: '$recordId' })
    wiredContacts({ data, error }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contacts = [];
            console.error('Error fetching contacts:', error);
        }
    }

    get hasContacts() {
        return this.contacts.length > 0;
    }
}