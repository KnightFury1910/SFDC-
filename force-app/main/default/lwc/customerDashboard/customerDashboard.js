// force-app/main/default/lwc/customerDashboard/customerDashboard.js
import { LightningElement, track } from 'lwc';

export default class CustomerDashboard extends LightningElement {
    @track selectedAccountId;

    /**
     * Handles the 'accountselect' event from the search component.
     * @param {CustomEvent} event - The event containing the selected accountId.
     */
    handleAccountSelect(event) {
        this.selectedAccountId = event.detail.accountId;
    }
}