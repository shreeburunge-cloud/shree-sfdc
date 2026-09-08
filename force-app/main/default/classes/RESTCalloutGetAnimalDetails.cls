/**
 * @Author Shrikrishna Burunge
 * Discription : This RESTCallout clas is created for get the animal details from external system and display on the UI 
 * in the salesforce.
 */
public class RESTCalloutGetAnimalDetails {
    @AuraEnabled
    public static string getAnimalRecords(){
       String body=null;
       string str='';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals');
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if(response.getStatusCode() == 200) {
            str=response.getBody();
        }
    // Deserialize the JSON string into collections 
    Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(str);   
    // Cast the values in the 'animals' key as a list
    List<Object> animals = (List<Object>) results.get('animals');
    System.debug('Received the following animals:');
    List<String> objAsStrings = new List<String>();
    List<Animal__c> alist = new List<Animal__c>();
    for(Object animal: animals) {
         objAsStrings.add((String) animal);
       //System.debug( 'value on the index0'+ objAsStrings.get(0));
       // Sotre these details into custom object in Salesforce org
   		 }
       Animal__c a = new Animal__c();
       a.Name = String.valueOf(objAsStrings.get(1));
       alist.add(a);
        System.debug('Received the following animals:'+alist);
       insert(alist);
       String s= String.ValueOf(animals);
       return s;        
    }
     // display animal records
    @AuraEnabled(cacheable=true)
    public static list<Animal__c> displayAnimalDetails(){
        return [SELECT Id,Name FROM Animal__c  LIMIT 10];
    }
    

}