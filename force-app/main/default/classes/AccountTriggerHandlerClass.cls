/***
 * @Author : shrirkishna burunge
 * @ Discription : Apex AccountTriggerHandlerClass update contact phone when account phone updated
 */
public with sharing class AccountTriggerHandlerClass {
    
    public static void updateContactPhone ( List<Account> newAccounts,Map<Id, Account> oldAccounts )
        {
           
             // define map for store updated conatct id
	        Map<Id,Account> accMap = new Map<Id,Account>();
	        for(Account acc : newAccounts){
		        //check oldPhone and new phone value it should be updated
		        System.debug('@@@ NEW PHONE @@@ '+ acc.phone );
                System.debug('@@@ OLD PHONE @@@ '+ oldAccounts.get(acc.Id).Phone );
		        If(acc.phone != oldAccounts.get(acc.Id).Phone){
			    // put updated phone accocunt ID in to map
			    accMap.put(acc.Id,acc);
		        }
	        }	
	        // fetch contact AccountId and home phone based on updated account ID using map.keySet() method 
	        // keySet() method store the all account id as a KAEY in the Map
            List<Contact> conList = new List<Contact>();
     	    for(Contact con : [SELECT Id,Phone,AccountId FROM Contact WHERE AccountId IN : accMap.keySet()]){
				//checked accMap contains contact AccountId is present or not 
				if(accMap.containsKey(con.AccountId)) { 
				// If accmap has updated phone then get phone from accMap and add to related contact phone
				con.Phone = accMap.get(con.AccountId).Phone;
				conList.add(con);
			    }
		    }
		if(!conList.isEmpty()){
		update conList; 
		}	
    }    
}