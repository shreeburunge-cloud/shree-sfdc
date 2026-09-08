/***
@@@ Created By : Shrirkrishna Burunge
@@@ Created Date : 2020-06-08
@@@ Discprition : RegistrationController class for Registration Form with Validation using LWC and Apex
***/
public with sharing class RegistrationController {
    @AuraEnabled
    public static void saveRegistration(
        String fullName,
        String email,
        String pan,
        String phone,
        Date dob,
        String gender,
        String state,
        Boolean agreed
    ) {
        Registration__c reg = new Registration__c(
            Full_Name__c = fullName,
            Email__c = email,
            PAN__c = pan,
            Phone__c = phone,
            DOB__c = dob,
            Gender__c = gender,
            State__c = state,
            Agreed__c = agreed
        );

        insert reg;
        system.debug('Registrationdetails--->'+reg);
    }
}