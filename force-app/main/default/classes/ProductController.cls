/***
 * @ Author :Shrirkishna Burunge
 * @ Discription : Apex ProductController class for Get product details,and save into cart item.
 */
public with sharing class ProductController {
    
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts() {
        return [
            SELECT Id, Name, Description, Image_URL__c, Price__c
            FROM Product2
            WHERE IsActive = true
        ];
    }

    @AuraEnabled
    public static void saveCartItem(Id productId, Integer quantity, Decimal price) {
        Cart_Item__c cart = new Cart_Item__c();
        cart.Product__c = productId;
        cart.Quantity__c = quantity;
        cart.Price__c = price;
        insert cart;
    }
}