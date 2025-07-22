import { LightningElement, api } from 'lwc';

export default class FeeComp extends LightningElement {
    @api itemname;

    connectedCallback() {
        console.log('The item is:', this.itemname);
    }
}