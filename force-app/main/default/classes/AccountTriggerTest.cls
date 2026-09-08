@isTest
public class AccountTriggerTest {
    @isTest
    public static void TestCreateNewAccount(){
        //Create 200 new accounts for billing state as CA
        List<Account> accnt = new List<Account>();
        for(Integer i=0 ; i < 200 ; i++){
            Account a = new Account(Name = 'test' +i);
            a.BillingState = 'CA';
            accnt.add(a);
        }
        
        //Perform test
        test.startTest();
        insert accnt;
        test.stopTest();
        
        //Verify test
        
        List<Account> ant = [Select Id From Account where ShippingState = 'CA' ];
        System.assertEquals(200, ant.size());
         
    }

}