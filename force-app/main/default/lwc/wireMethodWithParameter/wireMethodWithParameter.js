import { LightningElement, track, wire } from 'lwc';
import searchContactList from '@salesforce/apex/LWC_ContactController.searchContactList';
 export default class ShowContactsWMFP extends LightningElement {
    @track searchKey = '';
    @track contacts;
    @track error;      
 
    searchContact(event){        
        this.searchKey = event.target.value;        
    }
    /* Passing parameter in the wire method with $.
     Here accountName is same as parameter of LWC_ContactControllerclass.searchContactList in the method.
     */
    @wire(searchContactList, {accountName:'$searchKey'}) 
    wiredContacts({data, error}){
        if(data){
            this.contacts = data;
            this.error = undefined;
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
        }
    }
}