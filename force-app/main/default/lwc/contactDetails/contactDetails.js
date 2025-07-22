import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_CHANNEL from '@salesforce/messageChannel/AccountSelectionChannel__c';
import getContactsByAccountId from '@salesforce/apex/AccountController.getContactsByAccountId';

export default class ContactDetails extends LightningElement {
    accountId;
    contacts;
    accountTitle = 'Contacts';

    // Static resource image URL
    profileImageUrl = 'https://cognizanttechnologysolut-f9-dev-ed--c.develop.vf.force.com/resource/1752744015000/ContactImages';

    @wire(MessageContext)
    messageContext;

    @wire(getContactsByAccountId, { accountId: '$accountId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            console.error('Error fetching contacts', error);
            this.contacts = undefined;
        }
    }

    connectedCallback() {
        subscribe(this.messageContext, ACCOUNT_CHANNEL, (message) => {
            this.accountId = message.accountId;
            this.accountTitle = `Contacts for Account ID: ${this.accountId}`;
        });
    }
}