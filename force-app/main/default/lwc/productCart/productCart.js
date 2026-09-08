import { LightningElement, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import saveCartItem from '@salesforce/apex/ProductController.saveCartItem';

export default class ProductCart extends LightningElement {

    @track products = [];
    @track selectedProduct;
    @track cartItems = [];

    selectedProductId;
    showModal = false;
    quantity = 1;

    @wire(getProducts)
    wiredProducts({ data }) {
        if (data) {
            this.products = data;
        }
    }

    get productOptions() {
        return this.products.map(prod => ({
            label: prod.Name,
            value: prod.Id
        }));
    }

    handleProductChange(event) {
        this.selectedProductId = event.detail.value;
        this.selectedProduct = this.products.find(
            p => p.Id === this.selectedProductId
        );
    }

    handleImageClick() {
        this.showModal = true;
    }

    closeModal() {
        this.showModal = false;
        this.quantity = 1;
    }

    handleQuantityChange(event) {
        this.quantity = parseInt(event.detail.value, 10);
    }

    get previewTotal() {
        return (this.selectedProduct?.Price__c || 0) * this.quantity;
    }

    addToCart() {

        const existingItem = this.cartItems.find(
            item => item.productId === this.selectedProduct.Id
        );

        if (existingItem) {
            // If product already exists → increase quantity
            existingItem.quantity += this.quantity;
            existingItem.total = existingItem.quantity * existingItem.price;

            this.cartItems = [...this.cartItems];
        } else {
            // New product
            const item = {
                id: Date.now(),
                productId: this.selectedProduct.Id,
                name: this.selectedProduct.Name,
                quantity: this.quantity,
                price: this.selectedProduct.Price__c,
                total: this.previewTotal
            };

            this.cartItems = [...this.cartItems, item];
        }

        // Save in Salesforce
        saveCartItem({
            productId: this.selectedProduct.Id,
            quantity: this.quantity,
            price: this.selectedProduct.Price__c
        });

        this.closeModal();
    }

    removeFromCart(event) {
        const id = parseInt(event.currentTarget.dataset.id, 10);
        this.cartItems = this.cartItems.filter(item => item.id !== id);
    }

    // 🔥 Updated Total Products (Sum of Quantity)
    get totalProducts() {
        return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    // 🔥 Grand Total Amount
    get grandTotal() {
        return this.cartItems.reduce((sum, item) => sum + item.total, 0);
    }

    get imageClass() {
        return 'product-image selected';
    }
}