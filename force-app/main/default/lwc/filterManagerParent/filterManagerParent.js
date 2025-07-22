import { LightningElement } from 'lwc';

export default class filterManagerParent extends LightningElement {
    handleReset() {
        // Call the reset method in the child component
        this.template.querySelector('c-filter-Panel-Child').resetFilters();
    }
}