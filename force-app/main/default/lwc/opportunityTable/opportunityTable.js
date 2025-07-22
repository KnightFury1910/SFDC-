// force-app/main/default/lwc/opportunityTable/opportunityTable.js
import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getOpportunitiesByAccount from '@salesforce/apex/CustomerController.getOpportunitiesByAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Simplified columns using standard types
const COLUMNS = [
    { label: 'Name', fieldName: 'opportunityUrl', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' } },
    { label: 'Stage', fieldName: 'StageName', type: 'text' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'USD' } },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date-local' }
];

export default class OpportunityTable extends NavigationMixin(LightningElement) {
    @api recordId;
    columns = COLUMNS;
    opportunities = [];
    isLoading = true;

    @wire(getOpportunitiesByAccount, { accountId: '$recordId' })
    wiredOpportunities(result) {
        this.isLoading = true;
        if (result.data) {
            this.opportunities = result.data.map(opp => ({
                ...opp,
                opportunityUrl: `/${opp.Id}`
            }));
            this.isLoading = false;
        } else if (result.error) {
            this.showToast('Error', 'Failed to load opportunities.', 'error');
            this.isLoading = false;
        }
    }

    get isListEmpty() {
        return !this.isLoading && this.opportunities.length === 0;
    }

    handleAddOpportunity() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: `AccountId=${this.recordId}`
            }
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}