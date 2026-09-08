/***
 * @Author : shrirkishna burunge
 * @ Discription : Apex class for creating account through passing param
 */
public class AccountHandler {
public static Account insertNewAccount (String accName){               
    if(accName!=''){    
        try{
            Account a = new Account(Name=accName);
            insert a;
            System.debug('shrikrishna burunge! Account created');
            return a;
        } catch(Exception e){
            System.Debug('Account not created');
            return null;
        }
    } else {
        return null;
    }      
    }    
}