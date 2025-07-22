// force-app/main/default/lwc/newCaseForm/newCaseForm.js
import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewCaseForm extends LightningElement {
    @api recordId;

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    handleSuccess(event) {
        this.dispatchEvent(new CustomEvent('success'));
    }

    handleError(event) {
        const toastEvent = new ShowToastEvent({
            title: "Error Creating Case",
            message: event.detail.message,
            variant: "error"
        });
        this.dispatchEvent(toastEvent);
    }
}