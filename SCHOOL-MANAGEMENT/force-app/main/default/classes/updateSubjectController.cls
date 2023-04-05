public with sharing class updateSubjectController {
    @AuraEnabled
    public static Boolean updateSubject(Id subjectId, String name, Double score, Double score15, Double score45){
        Mon__c sb = [select Id, Name, Diem_15_1__c, Diem_15_2__c, Diem_1_Tiet__c from Mon__c where Id = :subjectId];

        if(sb != null){
            sb.Name = name;
            sb.Diem_15_1__c = score;
            sb.Diem_15_2__c = score15;
            sb.Diem_1_Tiet__c = score45;
        }
        try {
            System.debug(sb);
            update sb;
            return true;
        } catch (Dmlexception e) {
            System.debug('Một lỗi đã xuất hiện: ' + e.getMessage());
            return false;
        }
    }
}