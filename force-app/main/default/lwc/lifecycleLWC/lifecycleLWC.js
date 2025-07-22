import { LightningElement } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    constructor() {
        super();
        console.log('Constructor: Component instance is created.');
    }

    connectedCallback() {
        console.log('connectedCallback: Component is inserted into the DOM.');
    }

    renderedCallback() {
        console.log('renderedCallback: Component has finished rendering.');
    }

    disconnectedCallback() {
        console.log('disconnectedCallback: Component is removed from the DOM.');
    }

    errorCallback(error, stack) {
        console.log('errorCallback: An error occurred.', error, stack);
    }
}