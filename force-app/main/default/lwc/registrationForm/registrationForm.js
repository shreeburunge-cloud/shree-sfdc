import { LightningElement,track,api,wire } from 'lwc';
import insertRegistrationDetails from '@salesforce/apex/RegistrationForm.insertRegistrationDetails';
import userName from '@salesforce/schema/UserDetail__c.Name';
import passwordF from '@salesforce/schema/UserDetail__c.Password__c';
//import eligibleF from '@salesforce/schema/UserDetail__c.Eligible__c';
import firstNameF from '@salesforce/schema/UserDetail__c.First_Name__c';
import lastNameF from '@salesforce/schema/UserDetail__c.Last_Name__c';
import emailF from '@salesforce/schema/UserDetail__c.Email__c';
import phoneF from '@salesforce/schema/UserDetail__c.Phone__c';
import pinF from '@salesforce/schema/UserDetail__c.PIN__c';
import panF from '@salesforce/schema/UserDetail__c.PAN__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class RegistrationForm extends LightningElement {
   
    @api recordId;
    @track errorMsg;
    @track getRegstrationRecord={
        Name:userName,
        Password__c:passwordF,
        //Eligible__c:eligibleF,
        First_Name__c:firstNameF,
        Last_Name__c:lastNameF,
        Email__c:emailF,
        Phone__c:phoneF,
        Pin__c:pinF,
        PAN__c:panF
    };
    userNameInpChange(event) {
        this.getRegstrationRecord.Name = event.detail.value;
    }
    
    passwordInpChange(event) {
        this.getRegstrationRecord.Password__c = event.detail.value;
    }
    /*eligibleInpChange(event) {
        this.getRegstrationRecord.Eligible__c = event.detail.value;
        console.log('Elogible YES?>>>>'+ this.getRegstrationRecord.Eligible__c );
    }*/
    firstNameInpChange(event) {
        this.getRegstrationRecord.First_Name__c = event.detail.value;
    }
    lastNameInpChange(event) {
        this.getRegstrationRecord.Last_Name__c = event.detail.value;
    }
    emailInpChange(event) {
        this.getRegstrationRecord.Email__c = event.detail.value;
    }
    phoneInpChange(event) {
        this.getRegstrationRecord.Phone__c = event.detail.value;
    }
    pinInpChange(event) {
        this.getRegstrationRecord.Pin__c = event.detail.value;
    }
    panInpChange(event) {
        this.getRegstrationRecord.PAN__c = event.detail.value;
    }
    
    submitDetails(){
        window.console.log('@@@@ before save +++');
         insertRegistrationDetails({userdetail:this.getRegstrationRecord})
        .then(result =>{
            /* In JavaScript if we trying to print other than primitive type variables(like string ,nubmer) in console.log or alert, then it will returns [Object Object]. If its return output as [Object Object], we can't know output as expected or not.
            By using JSON.stringify() function we can print output in string format. JSON.stringify() is a predefined JavaScript function, it takes object as a input parameter and returns json string if object in JavaScript specific object structure.*/
            console.log('Returned results===>' +JSON.stringify(result));  
            
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