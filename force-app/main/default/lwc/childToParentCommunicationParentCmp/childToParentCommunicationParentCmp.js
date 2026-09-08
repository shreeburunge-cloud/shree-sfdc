import { LightningElement } from 'lwc';

export default class ChildToParentCommunicationParentCmp extends LightningElement {
  selectedProduct = null;

    // Handle the product selection event from the child component
    handleProductSelection(event) {
        this.selectedProduct = event.detail; 
        console.log('++++++ SELECTED PRODUCTS ++++',JSON.stringify(this.selectedProduct));// Store the selected product details
    }
}