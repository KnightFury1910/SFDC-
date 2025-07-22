// force-app/main/default/lwc/newContactForm/newContactForm.js
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewContactForm extends LightningElement {
    @api recordId; // Receives the AccountId from the parent component

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSuccess(event) {
        // The success event from lightning-record-edit-form contains the new record's ID
        const detail = event.detail;
        console.log('New Contact Created with ID:', detail.id);
        
        // Dispatch success event to parent
        this.dispatchEvent(new CustomEvent('success'));
    }

    handleError(event) {
        // Dispatch a toast message on error
        const toastEvent = new ShowToastEvent({
            title: "Error Creating Contact",
            message: event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(toastEvent);
    }
}