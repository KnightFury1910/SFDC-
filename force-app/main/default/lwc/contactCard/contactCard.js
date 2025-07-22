// force-app/main/default/lwc/contactCard/contactCard.js
import { LightningElement, api, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import getContactsByAccount from '@salesforce/apex/CustomerController.getContactsByAccount';
import deleteContact from '@salesforce/apex/CustomerController.deleteContact';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const COLUMNS = [
    { label: 'Name', fieldName: 'contactUrl', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Title', fieldName: 'Title', type: 'text' },
    { type: 'action', typeAttributes: { rowActions: actions } },
];

export default class ContactCard extends NavigationMixin(LightningElement) {
    @api recordId;
    @track columns = COLUMNS;
    @track contacts = [];
    @track isModalOpen = false;
    
    wiredContactsResult;
    isLoading = true;

    @wire(getContactsByAccount, { accountId: '$recordId' })
    wiredContacts(result) {
        this.isLoading = true;
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data.map(contact => ({
                ...contact,
                contactUrl: `/${contact.Id}`
            }));
            this.isLoading = false;
        } else if (result.error) {
            this.showToast('Error', 'Failed to load contacts.', 'error');
            this.isLoading = false;
        }
    }

    get isListEmpty() {
        return !this.isLoading && this.contacts.length === 0;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'delete':
                this.deleteContactRecord(row.Id);
                break;
            case 'edit':
                this.navigateToEditPage(row.Id);
                break;
            case 'view':
                this.navigateToViewPage(row.Id);
                break;
            default:
        }
    }
    
    deleteContactRecord(contactId) {
        deleteContact({ contactId: contactId })
            .then(() => {
                this.showToast('Success', 'Contact deleted successfully.', 'success');
                refreshApex(this.wiredContactsResult);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    navigateToViewPage(contactId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: contactId,
                actionName: 'view',
            },
        });
    }

    navigateToEditPage(contactId) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: contactId,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });
    }
    
    handleNewContact() {
        this.isModalOpen = true;
    }

    handleCloseModal() {
        this.isModalOpen = false;
    }

    handleSuccess() {
        this.showToast('Success', 'New contact created.', 'success');
        this.isModalOpen = false;
        refreshApex(this.wiredContactsResult);
    }
    
    showToast(title, message, variant) {
        const event = new ShowToastEvent({ title, message, variant });
        this.dispatchEvent(event);
    }
}