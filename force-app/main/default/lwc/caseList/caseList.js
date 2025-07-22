// force-app/main/default/lwc/caseList/caseList.js
import { LightningElement, api, wire, track } from 'lwc';
import getCasesByAccount from '@salesforce/apex/CustomerController.getCasesByAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex'; // Import refreshApex

const COLUMNS = [
    { label: 'Case Number', fieldName: 'caseUrl', type: 'url', typeAttributes: { label: { fieldName: 'CaseNumber' }, target: '_blank' } },
    { label: 'Subject', fieldName: 'Subject', type: 'text' },
    { label: 'Status', fieldName: 'Status', type: 'text' }
];

export default class CaseList extends LightningElement {
    @api recordId;
    columns = COLUMNS;
    cases = [];
    isLoading = true;
    @track isNewCaseModalOpen = false; // Controls modal visibility
    wiredCasesResult; // Property to hold the wired result

    @wire(getCasesByAccount, { accountId: '$recordId' })
    wiredCases(result) {
        this.isLoading = true;
        this.wiredCasesResult = result; // Assign the result to the property
        if (result.data) {
            this.cases = result.data.map(caseRecord => ({
                ...caseRecord,
                caseUrl: `/${caseRecord.Id}`
            }));
            this.isLoading = false;
        } else if (result.error) {
            this.showToast('Error', 'Failed to load cases.', 'error');
            this.isLoading = false;
        }
    }

    get isListEmpty() {
        return !this.isLoading && this.cases.length === 0;
    }
    
    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    // --- MODAL HANDLING ---
    handleNewCase() {
        this.isNewCaseModalOpen = true;
    }

    handleCloseModal() {
        this.isNewCaseModalOpen = false;
    }

    handleSuccess() {
        this.showToast('Success', 'New case created.', 'success');
        this.isNewCaseModalOpen = false;
        // Refresh the case list to show the new record
        refreshApex(this.wiredCasesResult);
    }
}