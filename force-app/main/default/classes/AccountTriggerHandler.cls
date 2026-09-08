/* @Author Shrirkishna Burunge
 * Write an Apex trigger that fires before records are inserted 
 * and ensures that the ShippingState field has the same value as the BillingState field.
 ***/
public class AccountTriggerHandler {
    public static void CreateAccounts(List<Account> accts) { 
        for (Account acct : accts) {  
            if(acct.ShippingState!=acct.BillingState){
                acct.ShippingState=acct.BillingState; 
            } 
        } 
    }

}