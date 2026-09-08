/***
 * @ Author :Shrirkishna Burunge
 * @ Discription : Apex class for InsertPerson Details into custom object 
 */
public with sharing class PersonDetails {
    @AuraEnabled
    public static PersonDetail__c insertPersonDetails(string personName,string personLastName){
       PersonDetail__c perdet = new PersonDetail__c();
                         perdet.Name =personName;
                         perdet.Last_Name__c=personLastName;       
                        try {
                            insert perdet;
                        system.debug('Person details'+perdet);
                            return perdet;
                        } catch (Exception e) {
                            throw new AuraHandledException(e.getMessage());
                        }
    }
    
    @AuraEnabled(cacheable=true)
    public static list<PersonDetail__c> displayPersonDetails(){
        return [SELECT Id,Name,Last_Name__c FROM PersonDetail__c  LIMIT 10];
    }
}