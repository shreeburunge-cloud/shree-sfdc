import { LightningElement, track } from 'lwc';

export default class DiscountCalcyLauncher extends LightningElement {
    @track showCalculator = false;

    openCalculator() {
        this.showCalculator = true;
    }

    closeCalculator() {
        this.showCalculator = false;
    }
}