import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import CHANNEL1 from '@salesforce/messageChannel/Channel1__c';

export default class Subscriber2 extends LightningElement {
    receivedMessage;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        subscribe(this.messageContext, CHANNEL1, (message) => {
            this.receivedMessage = message.messageText;
        });
    }
}