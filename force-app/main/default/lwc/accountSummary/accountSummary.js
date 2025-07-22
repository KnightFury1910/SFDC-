// force-app/main/default/lwc/accountSummary/accountSummary.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// Import Account schema fields
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import OWNER_ID_FIELD from '@salesforce/schema/Account.OwnerId'; // Needed for URL

const FIELDS = [INDUSTRY_FIELD, TYPE_FIELD, RATING_FIELD, OWNER_NAME_FIELD, OWNER_ID_FIELD];

export default class AccountSummary extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount;

    get industry() {
        return getFieldValue(this.wiredAccount.data, INDUSTRY_FIELD);
    }

    get type() {
        return getFieldValue(this.wiredAccount.data, TYPE_FIELD);
    }

    get rating() {
        return getFieldValue(this.wiredAccount.data, RATING_FIELD);
    }

    get ownerName() {
        return getFieldValue(this.wiredAccount.data, OWNER_NAME_FIELD);
    }

    get ownerUrl() {
        const ownerId = getFieldValue(this.wiredAccount.data, OWNER_ID_FIELD);
        return ownerId ? `/${ownerId}` : '';
    }
}