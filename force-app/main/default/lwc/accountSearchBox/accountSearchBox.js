// force-app/main/default/lwc/accountSearchBox/accountSearchBox.js
import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/CustomerController.searchAccounts';

const DEBOUNCE_DELAY = 300;

export default class AccountSearchBox extends LightningElement {
    @track searchTerm = '';
    @track accounts = [];
    @track selectedAccountId = '';
    @track selectedAccountName = '';

    debounceTimeout;

    // --- GETTERS to compute dynamic values for the template ---
    get hasResults() {
        return this.accounts.length > 0;
    }
    
    // This new getter builds the correct CSS class string
    get comboboxClass() {
        let cssClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        if (this.hasResults) {
            cssClass += ' slds-is-open';
        }
        return cssClass;
    }

    // --- EVENT HANDLERS ---
    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;

        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            if (this.searchTerm.length >= 2) {
                this.fetchAccounts();
            } else {
                this.accounts = [];
            }
        }, DEBOUNCE_DELAY);
    }

    handleAccountSelect(event) {
        this.selectedAccountId = event.currentTarget.dataset.id;
        this.selectedAccountName = event.currentTarget.dataset.name;
        this.accounts = [];
        this.searchTerm = '';

        const selectEvent = new CustomEvent('accountselect', {
            detail: { accountId: this.selectedAccountId }
        });
        this.dispatchEvent(selectEvent);
    }

    handleClearSelection() {
        this.selectedAccountId = '';
        this.selectedAccountName = '';
        this.accounts = [];

        const clearEvent = new CustomEvent('accountselect', {
            detail: { accountId: null }
        });
        this.dispatchEvent(clearEvent);
    }
    
    fetchAccounts() {
        searchAccounts({ keyword: this.searchTerm })
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                console.error('Error searching accounts:', error);
                this.accounts = [];
            });
    }
}