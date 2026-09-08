import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {

    selectedComponent = '';

    handleClick(event) {
        this.selectedComponent = event.target.dataset.component;
    }

    get showRegistration() {
        return this.selectedComponent === 'registration';
    }

   get showRegexValidation() {
        return this.selectedComponent === 'regexvalidation';
    }

    get showWireMethod() {
        return this.selectedComponent === 'wiremethod';
    }

    get showWireMetodWithParams() {
        return this.selectedComponent === 'wiremethodwithparams';
    }

    get showApexRestcallout() {
        return this.selectedComponent === 'getanimaldetails';
    }
    get showChildToParentCompnent() {
        return this.selectedComponent === 'getproductdetails';
    }

     get showParentToChildCompnent() {
        return this.selectedComponent === 'getvaluefromparent';
    }

    get showLmsRecords() {
        return this.selectedComponent === 'lms';
    }
    get showDatatableRecords() {
        return this.selectedComponent === 'datatable';
    }
    get showPagenationRecords() {
        return this.selectedComponent === 'pagenation';
    }
    get showUIRecordApi() {
        return this.selectedComponent === 'uiRecordApi';
    }

    get showDiscountCalcy() {
        return this.selectedComponent === 'discountclacy';
    }
}