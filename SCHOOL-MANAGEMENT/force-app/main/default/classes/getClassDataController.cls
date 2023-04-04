public with sharing class getClassDataController {
    @AuraEnabled(cacheable=true)
    public static List<Lop__c> getClassData(){
        List<Lop__c> listC = [select Id, Name from Lop__c];
        if(listC != null){
            return listC;
        }
        return null;
    }
}