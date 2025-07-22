import { LightningElement, api } from 'lwc';

export default class filterPanelChild extends LightningElement {
    selectedFruits = ['Mango', 'Apple', 'Orange', 'Banana'];

    @api
    resetFilters() {
        this.selectedFruits = [];
    }
}