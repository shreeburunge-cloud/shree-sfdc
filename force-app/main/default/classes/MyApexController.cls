/***
 * @Author : shrirkishna burunge
 * @ Discription : This class is refer for calling @wire method 
 */
public with sharing class MyApexController {
    // Create Apex function call as wire funtion
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountDetails(){
        try {
            return [SELECT Id,Name From Account LIMIT 10];  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}