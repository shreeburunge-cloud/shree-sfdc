import { LightningElement, track,api,wire } from 'lwc';
//import insertPersonDetails from '@salesforce/apex/PersonDetails.insertPersonDetails';
import displayPersonDetails from '@salesforce/apex/PersonDetails.displayPersonDetails';
//import {ShowToastEvent} from 'lightning/platformShowToastEvent';
//import NAME_FIELD from '@salesforce/schema/PersonDetail__c.Name'; 
//import LAST_NAME_FIELD from '@salesforce/schema/PersonDetail__c.Last_Name__c';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
const COLUMNS= [{
    label: 'Person name',
    fieldName: 'Name',
    type: 'text'
    
},
{
    label: 'Last Name',
    fieldName: 'Last_Name__c',
    type: 'text'
}
];
export default class CustomValidation extends LightningElement {
    @track personRecoreId;
    @track errorMsg;
    @api fnameval;
    @track lnameVal;
    @track emailVal;
    columns = COLUMNS;
    @track selectedRecord;
    @track personList = [];
    @track error;
    @track wiredPersonList = [];
    @wire(displayPersonDetails) perList(result) {
    this.wiredPersonList = result;
    if (result.data) {
    this.personList = result.data;
    this.error = undefined;
    } else if (result.error) {
    this.error = result.error;
    this.personList = [];
    }
    }
    handelSelection(event) {
    if (event.detail.selectedRows.length > 0 ) {
    this.selectedRecord = event.detail.selectedRows[0].Id;
    }
    }
    deletePersonRecord() {
    deleteRecord(this.selectedRecord)
    .then(() => {
    refreshApex(this.wiredPersonList);
    })
    .catch(error => {
    })
    }

   /* personHandleChange(event){
    let currentLabel=event.target.label;
    console.log('@@@@label@@'+currentLabel);
    if(currentLabel==="First Name"){
        let fname=this.template.querySelector(".inputFname");
        this.fnameval=fname.value;
        console.log('FirstName is@@'+ this.fnameval);
        if(!this.fnameval){
            fname.setCustomValidity("Please Enter the FirstName");
        }
        else{
            fname.setCustomValidity("");
        }
        fname.reportValidity();
    }
    else if(currentLabel==="Last Name"){
            let lname=this.template.querySelector(".inputLname");
            this.lnameVal=lname.value;
        if(!this.lnameVal){
            lname.setCustomValidity("Please Enter Last name");
        }
        else{
            lname.setCustomValidity("");
        }
        lname.reportValidity();
    }
    
    /*else if(currentLabel==="Choose"){
        let isChecked=this.template.querySelector(".Choose");
        let isCheckedVal=isChecked.checked;
        if(isCheckedVal==false){
            isChecked.setCustomValidity("Please tick the checkbox");
        }
        else{
            isChecked.setCustomValidity("");
        }
        isChecked.reportValidity();

    }*/
//}
submitRecord(){ 
        /*console.log('First name value is'+this.fnameval);
      if(this.fnameval== null || this.fnameval == ''){
       
        alert('Enter first Name value');
      }
        else if(this.lnameVal == null || this.lnameVal == ''){
            alert('Enter Last Name value');
         }
            
       else{*/
       console.log('@@@@result');
        insertPersonDetails({personName:this.fnameval,personLastName:this.lnameVal})
        .then(result=>{
            this.personRecoreId=result.Id;
            console.log('@@@@result'+this.result);
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record Inserted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);

            })
            .catch(error =>{
                this.errorMsg=error.message;
                window.console.log(this.error);
            })        
        }
    }