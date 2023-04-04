public with sharing class addNewSubjectController {
    @AuraEnabled()
    public static Id addNewSubject(Id idStudent, String name, Double score, Double score15, Double score45){
        Mon__c sub = new Mon__c();
        sub.HocSinh__c = idStudent;
        sub.Name = name;
        sub.Diem_15_1__c = score;
        sub.Diem_15_2__c = score15;
        sub.Diem_1_Tiet__c = score45;

        try {
            insert sub;
            return sub.Id;
        } catch (Dmlexception e) {
            System.debug('Một lỗi đã xuất hiện: ' + e.getMessage());
            return null;
        }
    }

}