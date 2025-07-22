import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import FILTER_CHANNEL from '@salesforce/messageChannel/FilterMessageChannel__c';
import getIndustryPicklist from '@salesforce/apex/AccountController.getIndustryPicklist';
import getRatingPicklist from '@salesforce/apex/AccountController.getRatingPicklist';

export default class FilterPanel extends LightningElement {
    industry = '';
    rating = '';
    revenue = 0;

    industryOptions = [];
    ratingOptions = [];

    @wire(MessageContext)
    messageContext;

    @wire(getIndustryPicklist)
    wiredIndustry({ error, data }) {
        if (data) {
            this.industryOptions = data;
        } else if (error) {
            console.error('Error loading industry picklist', error);
        }
    }

    @wire(getRatingPicklist)
    wiredRating({ error, data }) {
        if (data) {
            this.ratingOptions = data;
        } else if (error) {
            console.error('Error loading rating picklist', error);
        }
    }

    handleIndustryChange(event) {
        this.industry = event.detail.value;
        this.publishFilters();
    }

    handleRatingChange(event) {
        this.rating = event.detail.value;
        this.publishFilters();
    }

    handleRevenueChange(event) {
        this.revenue = event.detail.value;
        this.publishFilters();
    }

    publishFilters() {
        publish(this.messageContext, FILTER_CHANNEL, {
            industry: this.industry,
            rating: this.rating,
            revenue: this.revenue
        });
    }
}