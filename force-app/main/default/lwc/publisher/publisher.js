import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import CHANNEL1 from '@salesforce/messageChannel/Channel1__c';

export default class Publisher extends LightningElement {
    // Required to use LMS
    @wire(MessageContext)
    messageContext;

    handleClick() {
        const message = {
            messageText: 'Hello from Publisher!'
        };
        publish(this.messageContext, CHANNEL1, message);
    }
}