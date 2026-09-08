/***
 * @Author :Shrikrishna Burunge
 * @Discription : Apex PagenationDemo class for getting case details based on page size
 */
public with sharing class PagenationDemo {
    
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(String searchKey, Integer pageNumber, Integer pageSize) {
        String key = '%' + searchKey + '%';
        return [SELECT Id, CaseNumber, Subject, Status, Priority
                FROM Case
                WHERE Subject LIKE :key
                ORDER BY LastModifiedDate DESC
                LIMIT :pageSize OFFSET :((pageNumber - 1) * pageSize)];
    }
}