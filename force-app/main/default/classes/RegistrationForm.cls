public with sharing class RegistrationForm {
    public RegistrationForm() {

    }
    @AuraEnabled
    public static UserDetail__c insertRegistrationDetails(UserDetail__c userdetail){
        
        
        try {     
                insert userdetail;
                return userdetail;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}