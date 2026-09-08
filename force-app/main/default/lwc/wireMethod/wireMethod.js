/**
 * Author: Shrikrishna Buurnge
 * Discription: Use of @wire method to fetch account details 
                * The wire service provisions an immutable stream of data.
                * Its reactive means automatically reflects data changes on UI.
                * we can avoid repetative server call. 
                * we cannot do dml in wire method directly
                * we must Apex method is marked with `@AuraEnabled(cacheable=true)
**/
import { LightningElement, wire } from 'lwc';
import getAccountDetails from '@salesforce/apex/MyApexController.getAccountDetails';
export default class WireMethod extends LightningElement {
    accData;
    error;
    @wire(getAccountDetails)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accData = undefined;
        }
    }

}