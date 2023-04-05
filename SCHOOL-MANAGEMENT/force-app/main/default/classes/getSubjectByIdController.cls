public with sharing class getSubjectByIdController {
    @AuraEnabled
    public static Mon__c getSubject(Id subjectId){
        Mon__c sb = [select Id, Name, Diem_15_1__c, Diem_15_2__c, Diem_1_Tiet__c, HocSinh__r.Name from Mon__c where Id = :subjectId];
        if(sb != null){
            System.debug(sb);
            return sb;
        }
        return null;
    }
}