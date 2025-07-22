import { LightningElement, wire } from 'lwc';
import { subscribe, publish, MessageContext } from 'lightning/messageService';
import FILTER_CHANNEL from '@salesforce/messageChannel/FilterMessageChannel__c';
import ACCOUNT_CHANNEL from '@salesforce/messageChannel/AccountSelectionChannel__c';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
    { label: 'View', name: 'view' }
];

export default class AccountTable extends LightningElement {
    filters = {};
    accounts = [];
    filteredAccounts = [];

    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Industry', fieldName: 'Industry' },
        { label: 'Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
        { label: 'Rating', fieldName: 'Rating' },
        { label: 'Phone', fieldName: 'Phone' },
        {
            type: 'action',
            typeAttributes: { rowActions: actions }
        }
    ];

    @wire(MessageContext)
    messageContext;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.filteredAccounts = data;
        } else if (error) {
            console.error('Error fetching accounts', error);
        }
    }

    connectedCallback() {
        subscribe(this.messageContext, FILTER_CHANNEL, (message) => {
            this.filters = message;
            this.applyFilters();
        });
    }

    applyFilters() {
        this.filteredAccounts = this.accounts.filter(acc => {
            const matchIndustry = !this.filters.industry || acc.Industry === this.filters.industry;
            const matchRating = !this.filters.rating || acc.Rating === this.filters.rating;
            const matchRevenue = !this.filters.revenue || acc.AnnualRevenue >= this.filters.revenue;

            return matchIndustry && matchRating && matchRevenue;
        });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'edit':
                this.editAccount(row);
                break;
            case 'delete':
                this.deleteAccount(row);
                break;
            case 'view':
                this.viewAccount(row);
                break;
        }

        publish(this.messageContext, ACCOUNT_CHANNEL, {
            accountId: row.Id
        });
    }

    editAccount(account) {
        alert(`Edit account: ${account.Name}`);
    }

    deleteAccount(account) {
        this.accounts = this.accounts.filter(acc => acc.Id !== account.Id);
        this.applyFilters();
    }

    viewAccount(account) {
        alert(`Viewing account: ${account.Name}`);
    }
}