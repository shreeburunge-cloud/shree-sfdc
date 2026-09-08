import { LightningElement, api, track } from 'lwc';

// Sample products data
const PRODUCTS = [
    { id: 1, name: 'Product A', price: 100, description: 'Description for Product A' },
    { id: 2, name: 'Product B', price: 150, description: 'Description for Product B' },
    { id: 3, name: 'Product C', price: 200, description: 'Description for Product C' }
];

export default class ChildToParentCommunication extends LightningElement {
    @track selectedProductId = '';  // Store selected product ID
    productOptions = [];  // Options for combobox

    // Initialize the combobox options and map product data
    connectedCallback() {
        this.productOptions = PRODUCTS.map(product => ({
            label: product.name,
            value: product.id.toString(),
        }));
    }

    // Dispatch event when a product is selected
    handleProductChange(event) {
        const productId = event.detail.value; // Get the selected product ID
        const selectedProduct = PRODUCTS.find(product => product.id.toString() === productId);
        
        // Dispatch custom event with selected product details
        const productSelectEvent = new CustomEvent('productselected', {
            detail: selectedProduct
        });

        this.dispatchEvent(productSelectEvent);  // Dispatch event to parent
    }
}