import { LightningElement } from 'lwc';
 
export default class parent extends LightningElement {
  productName = '';
  productPrice = '';
 
  handleNameChange(event) {
    this.productName = event.target.value;
  }
 
  handlePriceChange(event) {
    this.productPrice = event.target.value;
  }
 
  handleAddProduct() {
    const product = {
      name: this.productName,
      price: parseFloat(this.productPrice)
    };
 
    const childComp = this.template.querySelector('c-child');
    if (childComp) {
      childComp.addProduct(product);
    }
 
    this.productName = '';
    this.productPrice = '';
  }
}