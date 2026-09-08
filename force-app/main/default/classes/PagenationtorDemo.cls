public with sharing class PagenationtorDemo {
    // apex method to fetch contact records from salesforce database 
    @AuraEnabled
    public static list<Contact> fetchContacts(){        
            list<Contact> lstContact = new list<Contact>();
            for(Contact con : [SELECT id,name,email,phone,title FROM Contact LIMIT 1000]){
                lstContact.add(con);
            } 
            return lstContact;        
    }
}