import { LightningElement, api, track } from 'lwc';

export default class child extends LightningElement {
@track products = [];

@api
addProduct(product) {
this.products = [...this.products, product];
}
}