import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    receivedMessage = '';

    handleEvent(event) {
        this.receivedMessage = event.detail.message;
        console.log('Received message from child:', this.receivedMessage);
    }
}