import { LightningElement, track } from 'lwc';

export default class DiscountCalculator extends LightningElement {

    @track price = 0;
    @track discount = 0;
    @track finalPrice;

    handlePrice(event) {
        this.price = Number(event.target.value);
    }

    handleDiscount(event) {
        this.discount = Number(event.target.value);
    }

    calculate() {
        const discountAmount = (this.price * this.discount) / 100;
        this.finalPrice = (this.price - discountAmount).toFixed(2);
    }

    close() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}