// @@@ Devepoled By: shrikrishna Burunge
// @@@ Created date: 03/08/2023
// @@@ Purpose     : Rest callout demo to get value from external system


import { LightningElement, track,api,wire } from 'lwc';
import getAnimalRecords from '@salesforce/apex/ApexRESTCallout.getAnimalRecords';
import displayPersonDetails from '@salesforce/apex/PersonDetails.displayPersonDetails';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/PersonDetail__c.Name'; 
import LAST_NAME_FIELD from '@salesforce/schema/PersonDetail__c.Last_Name__c';
 const COLUMNS = [{
 
    label: 'First Name',

    fieldName: NAME_FIELD.fieldApiName,

    type: 'text'

},

{

    label: 'Last Name',

    fieldName: LAST_NAME_FIELD.fieldApiName,

    type: 'text'

}
 
];

 
export default class CustomValidation extends LightningElement {
    @track personRecoreId;
    @track errorMsg;

    columns = COLUMNS;
    @wire(displayPersonDetails) displayPDetails;

    getRecords(){// this  is a onclick button method
    
        getAnimalRecords()
        .then(result=>{
            this.personRecoreId=result.Id;
            console.log( this.personRecoreId);
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