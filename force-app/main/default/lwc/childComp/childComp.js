import { LightningElement } from 'lwc';

export default class ChildComp extends LightningElement {
    handleClick() {
        const evt = new CustomEvent('eventname', {
            detail: { message: 'Hello from Child Component!' }
        });
        this.dispatchEvent(evt);
    }
}