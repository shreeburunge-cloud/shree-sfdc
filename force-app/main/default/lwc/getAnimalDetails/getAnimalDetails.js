// @@@ Devepoled By: shrikrishna Burunge
// @@@ Created date: 03/08/2023
// @@@ Purpose     : Rest callout demo to get value from external system

import { LightningElement, track,api,wire } from 'lwc';
import getAnimalRecords from '@salesforce/apex/RESTCalloutGetAnimalDetails.getAnimalRecords';
import displayAnimalDetails from '@salesforce/apex/RESTCalloutGetAnimalDetails.displayAnimalDetails';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Animal__c.Name'; 
import { refreshApex } from '@salesforce/apex';

 const COLUMNS = [{
 
    label: 'First Name',

    fieldName: NAME_FIELD.fieldApiName,

    type: 'text'

}
 
];

 
export default class CustomValidation extends LightningElement {
    @track animalRecoreId;
    @track errorMsg;
/*   
@track animaltList = [];
@track error;
@track wiredAnimaltList = [];
@wire(displayAnimalDetails) displayADetails(result) {
this.wiredAnimalList = result;
if (result.data) {
this.animalList = result.data;
this.error = undefined;
} else if (result.error) {
this.error = result.error;
this.animaltList = [];

}
}*/

    columns = COLUMNS;
    @wire(displayAnimalDetails) displayADetails;
   
    getRecords(){// this  is a onclick button method
    
        getAnimalRecords()
        .then(result=>{
            this.animalRecoreId=result.Id;
            console.log( this.animalRecoreId);
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record fetch successfully!!',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

            })
            .catch(error =>{
                this.errorMsg=error.message;
                window.console.log(this.error);
            });        
     }
    
}